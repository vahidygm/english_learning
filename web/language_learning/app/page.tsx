import Link from "next/link";
import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent">
            English Learning
          </span>
        </h1>

        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
          Master English with interactive lessons, quizzes, and personalized
          learning paths. Start your journey to fluency today.
        </p>

        <Button asChild size="lg" className="text-base">
          <Link href="/lessons">
            <BookOpen className="mr-2 h-5 w-5" />
            Start Learning
          </Link>
        </Button>
      </div>
    </main>
  );
}
