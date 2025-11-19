interface CartBottomBarProps {
  price: number;
  onCart?: () => void;
}
export function CartBottomBar({ price, onCart }: CartBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500">Total Price</span>
        <span className="text-2xl">${price.toFixed(2)}</span>
      </div>
      <button
        onClick={onCart}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
      >
        Add to Cart
      </button>
    </div>
  );
}
