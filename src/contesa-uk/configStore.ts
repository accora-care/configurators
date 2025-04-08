// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "COLOR"
  | "FABRIC"
  | "ACCESSORIES"
  | "SIDE_PANEL"
  | "HEADBOARD";

export type StoreValues = {
  variant: string;
  color: string;
  fabric: string;
  sidePanel: "With Side Panels" | "No Side Panels";
  liftingPole: "Included" | "Not included";
  safetyMat: "Included" | "Not included";
  assistBar: "Long" | "Short" | "None";
  proTectSideRail: "Included" | "Not included";
  fabricSideRails: "Included" | "Not included";
  foldingSideRails: "Included" | "Not included";
  foldingSideRailsWithBumper: "Included" | "Not included";
  widthAdjustmentKit: "Included" | "Not included";
  bedWallBumper: "Included" | "Not included";
  lengthExtension: "Included" | "Not included";
  foldingBedLever: "Included" | "Not included";
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  variant: "Arc",
  color: "Vicenza Oak",
  fabric: "Silver",
  sidePanel: "No Side Panels",
  liftingPole: "Not included",
  safetyMat: "Not included",
  assistBar: "None",
  proTectSideRail: "Not included",
  fabricSideRails: "Not included",
  foldingSideRails: "Not included",
  foldingSideRailsWithBumper: "Not included",
  widthAdjustmentKit: "Not included",
  bedWallBumper: "Not included",
  lengthExtension: "Not included",
  foldingBedLever: "Not included",
  selectorView: null,
};

export const configStore = writable(initVal);
