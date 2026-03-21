# Stage 1: Build the Next.js frontend
FROM node:20-slim AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
# In Docker: frontend calls /api/* which Next.js rewrites to internal FastAPI
ENV NEXT_PUBLIC_API_URL="/api"
ENV BACKEND_URL="http://127.0.0.1:8000"
RUN npm run build

# Stage 2: Final image
FROM python:3.12-slim

# Install Node.js (for Next.js standalone server) and supervisor
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs supervisor && \
    rm -rf /var/lib/apt/lists/*

# Backend
WORKDIR /app/backend
COPY backend/pyproject.toml .
RUN pip install --no-cache-dir -e .
COPY backend/app/ app/

# Frontend (Next.js standalone)
WORKDIR /app/frontend
COPY --from=frontend-build /frontend/.next/standalone ./
COPY --from=frontend-build /frontend/.next/static .next/static
COPY --from=frontend-build /frontend/public public/

# Supervisor: runs both services in one container
RUN mkdir -p /etc/supervisor/conf.d
RUN printf '[supervisord]\n\
nodaemon=true\n\
logfile=/dev/null\n\
logfile_maxbytes=0\n\
\n\
[program:backend]\n\
command=uvicorn app.main:app --host 127.0.0.1 --port 8000\n\
directory=/app/backend\n\
stdout_logfile=/dev/fd/1\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/fd/2\n\
stderr_logfile_maxbytes=0\n\
autorestart=true\n\
\n\
[program:frontend]\n\
command=node /app/frontend/server.js\n\
environment=PORT=3000,HOSTNAME=0.0.0.0\n\
stdout_logfile=/dev/fd/1\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/fd/2\n\
stderr_logfile_maxbytes=0\n\
autorestart=true\n' > /etc/supervisor/conf.d/app.conf

# Only port 3000 exposed — Next.js proxies /api/* to FastAPI on :8000 internally
EXPOSE 3000

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/app.conf"]
