/** A tiny pink heart and a line of proof: a project people actually love. */
export default function LovedBadge({ children }: { children: React.ReactNode }) {
  return (
    <>
      {' '}
      <span className="inline-flex items-center gap-0.5 whitespace-nowrap align-baseline text-[11px] text-neutral-500">
      <svg viewBox="0 0 24 22" className="h-2.5 w-2.5 flex-none" aria-hidden="true">
        <path
          fill="#E8739B"
          d="M12 21.2C5.6 16.4 1.2 12.6 1.2 7.4 1.2 3.9 3.9 1.2 7.2 1.2c2 0 3.8 1 4.8 2.6 1-1.6 2.8-2.6 4.8-2.6 3.3 0 6 2.7 6 6.2 0 5.2-4.4 9-10.8 13.8Z"
        />
      </svg>
      {children}
    </span>
    </>
  );
}
