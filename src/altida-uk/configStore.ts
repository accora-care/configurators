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
  sidePanel: "With Side Panels" | "No Side Panels";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "Arc",
  color: "Vicenza Oak",
  fabric: "Silver",
  sidePanel: "No Side Panels",
  selectorView: null,
};

export const configStore = writable(initVal);
