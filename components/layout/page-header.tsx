export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.14em] text-blue-600 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950">
          {title}
        </h1>
        <p className="mt-2 text-base leading-7 text-slate-600">{description}</p>
      </div>
      {action}
    </header>
  );
}
