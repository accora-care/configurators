// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "COLOR"
  | "ACCESSORIES"
  | "SIDE_PANEL"
  | "ASSIST_BAR"
  | "HEADBOARD";

export type StoreValues = {
  variant: string;
  color: string;
  sidePanel: "Included" | "Not included";
  liftingPole: "Included" | "Not included";
  safetyMat: "Included" | "Not included";
  assistBar: "Long" | "Short" | "None";
  proTectSideRail: "Included" | "Not included";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "ARC",
  color: "Vicenza Oak",
  sidePanel: "Not included",
  liftingPole: "Not included",
  safetyMat: "Not included",
  assistBar: "None",
  proTectSideRail: "Not included",
  selectorView: null,
};

export const configStore = writable(initVal);
