import Link from "next/link";
import { BookOpen, Trophy, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Total Lessons",
    value: "24",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "In Progress",
    value: "5",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "Completed",
    value: "12",
    icon: Trophy,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track your progress and continue your learning journey.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${stat.bg} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button asChild size="lg">
          <Link href="/lessons">
            <BookOpen className="mr-2 h-5 w-5" />
            Continue Learning
          </Link>
        </Button>
      </div>
    </div>
  );
}
