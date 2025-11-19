interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}
export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <span>Quantity:</span>
      <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-2">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-6 h-6 flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-6 h-6 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
