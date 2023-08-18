// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "COLOR"
  | "FABRIC"
  | "ACCESSORIES"
  | "SIDE_PANEL"
  | "ASSIST_BAR"
  | "HEADBOARD";

export type StoreValues = {
  variant: string;
  color: string;
  fabric: string;
  sidePanel: "Included" | "Not included";
  liftingPole: "Included" | "Not included";
  safetyMat: "Included" | "Not included";
  assistBar: "Long" | "Short" | "None";
  proTectSideRail: "Included" | "Not included";
  fabricSideRails: "Included" | "Not included";
  foldingSideRails: "Included" | "Not included";
  foldingSideRailsWithBumper: "Included" | "Not included";
  widthAdjustmentKit: "Included" | "Not included";
  bedWallBumper: "Included" | "Not included";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "Arc",
  color: "Vicenza Oak",
  fabric: "Silver",
  sidePanel: "Not included",
  liftingPole: "Not included",
  safetyMat: "Not included",
  assistBar: "None",
  proTectSideRail: "Not included",
  fabricSideRails: "Not included",
  foldingSideRails: "Not included",
  foldingSideRailsWithBumper: "Not included",
  widthAdjustmentKit: "Not included",
  bedWallBumper: "Not included",
  selectorView: null,
};

export const configStore = writable(initVal);
