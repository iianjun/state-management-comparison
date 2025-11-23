export function CartBadge({ num }: { num: number }) {
  return (
    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 bg-primary text-primary-foreground">
      {num}
    </span>
  );
}
