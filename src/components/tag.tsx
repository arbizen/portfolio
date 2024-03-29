export function TagContainer({ children }: { children?: React.ReactNode }) {
  return <div className="flex gap-5">{children}</div>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded text-base leading-tight border-slate-200 border p-2.5 cursor-pointer">
      {children}
    </div>
  );
}
