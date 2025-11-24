import { Button } from "./Button";

interface CartBottomBarProps {
  price: number;
  onCart?: () => void;
}
export function CartBottomBar({ price, onCart }: CartBottomBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-gray-500">Total Price</span>
        <span className="text-2xl">${price.toFixed(2)}</span>
      </div>
      <Button onClick={onCart}>Add to Cart</Button>
    </div>
  );
}
