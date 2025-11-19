"use client";
import { Product } from "../types";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { cn } from "../lib/utils";

type ProductContextType = {
  product: Product;
};
const ProductContext = React.createContext<ProductContextType | undefined>(
  undefined
);

function useProductContext() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProductContext must be used within a ProductProvider");
  return context;
}

interface ProductCommonProps {
  className?: string;
}
interface ProductCardProps extends React.PropsWithChildren<ProductCommonProps> {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({
  children,
  onClick,
  product,
  className,
}: ProductCardProps) {
  return (
    <ProductContext.Provider
      value={{
        product,
      }}
    >
      <div className={cn("space-y-1", className)} onClick={onClick}>
        {children}
      </div>
    </ProductContext.Provider>
  );
}

interface ProductCardImageProps extends ProductCommonProps {
  width?: number;
  height?: number;
}
ProductCard.Image = function ProductCardImage({
  width = 200,
  height = 200,
  className,
}: ProductCardImageProps) {
  const { product } = useProductContext();
  return (
    <div
      className={cn(
        "relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2",
        className
      )}
    >
      <Image
        width={width}
        height={height}
        className="object-cover h-50"
        src={product.image}
        alt={product.name}
      />
    </div>
  );
};

ProductCard.Category = function ProductCardCategory({
  className,
}: ProductCommonProps) {
  const { product } = useProductContext();
  return <p className={cn("text-gray-500", className)}>{product.category}</p>;
};

ProductCard.Name = function ProductCardName({ className }: ProductCommonProps) {
  const { product } = useProductContext();
  return <h3 className={cn("line-clamp-2", className)}>{product.name}</h3>;
};

ProductCard.Rating = function ProductCardRating({
  className,
}: ProductCommonProps) {
  const { product } = useProductContext();
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span>{product.rating}</span>
      <span className="text-gray-500">({product.reivewCount})</span>
    </div>
  );
};

ProductCard.Price = function ProductCardPrice({
  className,
}: ProductCommonProps) {
  const { product } = useProductContext();
  return (
    <p className={cn("text-gray-500", className)}>
      ${product.price.toFixed(2)}
    </p>
  );
};
