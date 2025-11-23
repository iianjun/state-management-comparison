"use client";
import { Header, ProductCard, useProducts } from "@repo/shared";
import Link from "next/link";
import Cart from "@/components/Cart";
export default function Home() {
  const { data, isLoading } = useProducts();
  return (
    <>
      <Header>
        <h1>My shop</h1>
        <Cart />
      </Header>
      <div className="grid grid-cols-2 p-4 gap-4">
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <ProductCard.Skeleton key={index} />
          ))}
        {(data || []).map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard className="space-y-1" product={product}>
              <ProductCard.Image className="mb-3" />
              <ProductCard.Category />
              <ProductCard.Name />
              <ProductCard.Rating />
              <ProductCard.Price />
            </ProductCard>
          </Link>
        ))}
      </div>
    </>
  );
}
