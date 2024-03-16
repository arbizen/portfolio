export default function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-black text-[40px]">{title}</h1>
    </div>
  );
}
