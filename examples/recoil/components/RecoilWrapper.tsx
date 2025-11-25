"use client";
import { RecoilRoot } from "recoil";

export default function RecoilWrapper({ children }: React.PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
