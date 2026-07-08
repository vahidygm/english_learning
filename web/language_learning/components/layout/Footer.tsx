export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-4 text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Learn English. All rights reserved.
    </footer>
  );
}
