"use client";
import { Product } from "../types";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { cn } from "../lib/utils";
import { Skeleton } from "./Skeleton";

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
      <div className={className} onClick={onClick}>
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
        "relative aspect-square bg-gray-100 rounded-lg overflow-hidden",
        className
      )}
    >
      <Image
        width={width}
        height={height}
        className="object-cover w-full h-full"
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

ProductCard.Description = function ProductCardDescription({
  className,
}: ProductCommonProps) {
  const { product } = useProductContext();
  return (
    <p className={cn("text-gray-700", className)}>{product.description}</p>
  );
};

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <div className="space-y-1">
      <div className="mb-3">
        <Skeleton className="h-50 w-50 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-20 rounded" />
      <Skeleton className="h-6 w-40 rounded" />
      <Skeleton className="h-6 w-22 rounded" />
      <Skeleton className="h-6 w-10 rounded" />
    </div>
  );
};
