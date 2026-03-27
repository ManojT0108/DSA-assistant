"use client";

import { useState } from "react";
import Markdown from "./Markdown";
import LoadingSkeleton from "./LoadingSkeleton";
import HintPanel from "./HintPanel";

interface CodeAssistantPaneProps {
  slug: string;
  problemTitle: string;
  patterns: string[];
}

export default function CodeAssistantPane({ slug, problemTitle, patterns }: CodeAssistantPaneProps) {
  const [language, setLanguage] = useState("python");
  const [userCode, setUserCode] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [failedInput, setFailedInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [actualOutput, setActualOutput] = useState("");
  const [mode, setMode] = useState<"debug" | "continue">("debug");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);
  const [followUp, setFollowUp] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const handleSubmit = async (selectedMode: "debug" | "continue") => {
    setLoading(true);
    setMode(selectedMode);
    try {
      const res = await fetch(`/api/assist/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_code: userCode,
          language,
          extra_context: extraContext,
          failed_input: failedInput || null,
          expected_output: expectedOutput || null,
          actual_output: actualOutput || null,
          mode: selectedMode,
        }),
      });
      const data = await res.json();
      setResponse(data.response);
      setConversationHistory([]);
      setFollowUp("");
    } catch {
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp.trim() || followUpLoading) return;
    setFollowUpLoading(true);

    const newHistory = [
      ...conversationHistory,
      { role: "assistant", content: response },
      { role: "user", content: followUp },
    ];

    try {
      const res = await fetch(`/api/assist/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_code: userCode,
          language,
          extra_context: extraContext,
          failed_input: failedInput || null,
          expected_output: expectedOutput || null,
          actual_output: actualOutput || null,
          mode,
          conversation_history: newHistory,
        }),
      });
      const data = await res.json();
      setConversationHistory(newHistory);
      setResponse(data.response);
      setFollowUp("");
    } catch {
      setResponse("An error occurred. Please try again.");
    } finally {
      setFollowUpLoading(false);
    }
  };

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
  ];

  return (
    <div className="p-6 space-y-6 text-base text-[var(--text-secondary)]">
      <div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
          Code Assistant
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Paste your code for <span className="text-[var(--accent)]">{problemTitle}</span> and get AI-powered debugging or continuation help.
        </p>
      </div>

      {/* Language Selector */}
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Code Textarea */}
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Your Code
        </label>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={12}
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--code-bg)] px-4 py-3 font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
        />
      </div>

      {/* Extra Context */}
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Extra Context <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          value={extraContext}
          onChange={(e) => setExtraContext(e.target.value)}
          placeholder="Any additional context about your approach..."
          rows={3}
          className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
        />
      </div>

      {/* Failed Test Case Fields */}
      <div className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
          Failed Test Case <span className="normal-case tracking-normal">(optional)</span>
        </h3>
        <div>
          <label className="mb-1.5 block text-xs text-[var(--text-muted)]">Failed Input</label>
          <textarea
            value={failedInput}
            onChange={(e) => setFailedInput(e.target.value)}
            placeholder="e.g. [1, 2, 3]"
            rows={2}
            className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-[var(--text-muted)]">Expected Output</label>
          <textarea
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
            placeholder="e.g. [3, 2, 1]"
            rows={2}
            className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-[var(--text-muted)]">Your Output</label>
          <textarea
            value={actualOutput}
            onChange={(e) => setActualOutput(e.target.value)}
            placeholder="e.g. [1, 3, 2]"
            rows={2}
            className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit("debug")}
          disabled={loading || !userCode.trim()}
          className="flex-1 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Debug My Code
        </button>
        <button
          onClick={() => handleSubmit("continue")}
          disabled={loading || !userCode.trim()}
          className="flex-1 rounded-lg border border-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-dim)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue My Code
        </button>
      </div>

      {/* Loading State */}
      {loading && <LoadingSkeleton />}

      {/* AI Response */}
      {response && !loading && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            {mode === "debug" ? "Debug Analysis" : "Code Continuation"}
          </h3>
          <Markdown content={response} />
        </div>
      )}

      {/* Follow-up Chat */}
      {response && !loading && (
        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
            Follow-up Question
          </h3>
          {conversationHistory.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-3">
              {conversationHistory.map((msg, i) => (
                <div key={i} className={`text-sm ${msg.role === "user" ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`}>
                  <span className="font-semibold text-xs uppercase tracking-widest">{msg.role === "user" ? "You" : "Assistant"}: </span>
                  {msg.role === "assistant" ? (
                    <div className="mt-1"><Markdown content={msg.content} /></div>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFollowUp()}
              placeholder="Ask a follow-up question..."
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-colors"
            />
            <button
              onClick={handleFollowUp}
              disabled={followUpLoading || !followUp.trim()}
              className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {followUpLoading ? "Thinking..." : "Ask"}
            </button>
          </div>
        </div>
      )}

      {/* Hint Section */}
      <HintPanel slug={slug} />
    </div>
  );
}
