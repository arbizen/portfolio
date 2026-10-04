/** A small piece of meta, in grey text: no coloured pill. */
export default function Badge({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className="text-xs text-neutral-500">{children}</span>;
}
