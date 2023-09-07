// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "COLOR"
  | "FABRIC"
  | "SIDE_PANEL"
  | "HEADBOARD";

export type StoreValues = {
  variant: string;
  color: string;
  fabric: string;
  sidePanel: "Included" | "Not included";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "Arc",
  color: "Vicenza Oak",
  fabric: "Silver",
  sidePanel: "Not included",
  selectorView: null,
};

export const configStore = writable(initVal);
