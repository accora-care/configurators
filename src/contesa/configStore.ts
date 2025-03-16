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
  lengthExtension: "Included" | "Not included";
  assistBar: "Long" | "Short" | "Folding" | "None";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "Skandi",
  color: "Natural Lancaster Oak",
  sidePanel: "Included",
  liftingPole: "Not included",
  safetyMat: "Not included",
  lengthExtension: "Not included",
  assistBar: "None",
  selectorView: null,
};

export const configStore = writable(initVal);
