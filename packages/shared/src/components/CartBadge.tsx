export function CartBadge({ num }: { num: number }) {
  return (
    <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border p-0 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
      {num}
    </span>
  );
}
