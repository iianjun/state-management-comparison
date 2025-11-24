import { Button } from "./Button";

interface CartCheckoutBottomBarProps {
  total: number;
  shipping: number;
  onClick?: () => void;
}

export function CartCheckoutBottomBar({
  total,
  shipping,
  onClick,
}: CartCheckoutBottomBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="text-2xl">${(total + shipping).toFixed(2)}</span>
        </div>
        <Button onClick={onClick}>Proceed to Checkout</Button>
      </div>
    </div>
  );
}
