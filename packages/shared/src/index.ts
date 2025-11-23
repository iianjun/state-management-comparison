// Components
export { ProductCard } from "./components/ProductCard";
export { Header } from "./components/Header";
export { QueryClientProvider } from "./components/QueryClientProvider";
export { Hydrate } from "./components/Hydrate";
export { QuantitySelector } from "./components/QuantitySelector";
export { CartBottomBar } from "./components/CartBottomBar";
export { CartBadge } from "./components/CartBadge";

// Types
export * from "./types";
// Utils
export * from "./lib/utils";
export { getQueryClient } from "./lib/get-query-client";
// Hooks
export { useProducts } from "./hooks/useProducts";
export { useProduct } from "./hooks/useProduct";
export { useCarts } from "./hooks/useCarts";

// icons
export { ShoppingCartIcon } from "lucide-react";
export { ArrowLeftIcon } from "lucide-react";

//services
export { getProduct, getProducts } from "./services/product";
export { getCarts } from "./services/cart";
