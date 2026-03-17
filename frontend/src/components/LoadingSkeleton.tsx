export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-8 w-2/3 rounded bg-gray-700/50" />
      <div className="flex gap-2">
        <div className="h-6 w-24 rounded-full bg-gray-700/50" />
        <div className="h-6 w-20 rounded-full bg-gray-700/50" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-700/50" />
        <div className="h-4 w-5/6 rounded bg-gray-700/50" />
        <div className="h-4 w-4/6 rounded bg-gray-700/50" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-700/50" />
        <div className="h-4 w-full rounded bg-gray-700/50" />
        <div className="h-4 w-3/4 rounded bg-gray-700/50" />
      </div>
      <div className="h-48 w-full rounded bg-gray-700/50" />
    </div>
  );
}
