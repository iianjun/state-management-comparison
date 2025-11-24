import { ArrowLeftIcon, Header } from "@repo/shared";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="flex items-center gap-3">
          <Link aria-label="Back" href="/">
            <ArrowLeftIcon />
          </Link>
          <h1>Shopping Cart</h1>
        </div>
      </Header>
      {children}
    </>
  );
}
