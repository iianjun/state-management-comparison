import { atom } from "jotai";
import { Cart } from "@repo/shared";

export const cartItems = atom<Cart>([]);
