import { Button } from "./Button";

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
      <Button onClick={onCart}>Add to Cart</Button>
    </div>
  );
}
