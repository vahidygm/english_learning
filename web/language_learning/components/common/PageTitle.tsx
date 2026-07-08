interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text-2xl font-bold tracking-tight">{children}</h1>
  );
}
