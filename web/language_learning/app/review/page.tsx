import { RotateCcw } from "lucide-react";

export default function ReviewPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <RotateCcw className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Review</h1>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <p className="text-muted-foreground">
          Your review sessions will appear here.
        </p>
      </div>
    </div>
  );
}
