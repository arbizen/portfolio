export function TagContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex gap-5 sm:overflow-x-scroll hide-scrollbar sm:gap-3">
      {children}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded text-base sm:text-sm leading-tight border-slate-200 border p-2.5 sm:p-1.5 sm:px-2 cursor-pointer">
      {children}
    </div>
  );
}
