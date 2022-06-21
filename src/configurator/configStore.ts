// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "COLOR"
  | "ACCESSORIES"
  | "SIDE_PANEL"
  | "ASSIST_BAR"
  | "HEADBOARD";

export const initVal: {
  variant: string;
  color: string;
  sidePanel: string;
  liftingPole: string;
  safetyMat: string;
  assistBar: string;
  selectorView: SELECTOR_VIEW | null;
} = {
  variant: "Skandi",
  color: "Locarno Cherry",
  sidePanel: "Included",
  liftingPole: "true",
  safetyMat: "false",
  assistBar: "Long",
  selectorView: "COLOR",
};

export const configStore = writable(initVal);
