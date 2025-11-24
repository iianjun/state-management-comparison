import { cn } from "../lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  size?: "sm" | "md";
}
export function QuantitySelector({
  value,
  onChange,
  className,
  size = "md",
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2",
        className,
        {
          "px-3 py-1": size === "sm",
        }
      )}
    >
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-6 h-6 flex items-center justify-center"
      >
        -
      </button>
      <span
        className={cn("w-8 text-center", {
          "w-6": size === "sm",
        })}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-6 h-6 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}
