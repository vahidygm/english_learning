import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-2 text-7xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page not found</h2>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>
        <Link href="/" className={buttonVariants()}>
          Go back home
        </Link>
      </div>
    </main>
  );
}
