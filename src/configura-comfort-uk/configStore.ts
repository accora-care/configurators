// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "FABRIC"
  | "SIZE"
  | "PRESSURE"
  | "POSTURE"
  | "ARMRESTS"
  | "ACCESSORIES";

export type BACKREST_OPTIONS =
  | "Waterfall" | "Cocoon" | "Lateral Support Backrest" | "Adjustable Lateral Support";

export type StoreValues = {
  vinyl: boolean;
  width: 16 | 18 | 20 | 22 | 24 | 26 | "";
  chairType: string | null;
  depth: 16 | 18 | 20 | "";
  height: 15 | 16 | 17 | 18 | 19 | 20 | "";
  pressure: "Visco" | "CushionAir" | "Allevia Duo Cushion";
  backrest: BACKREST_OPTIONS;
  lateralSupport: "Lateral Support Wedges" | "None";
  dropdownArmrest: boolean;
  profiledHeadrest: boolean;
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  vinyl: false,
  width: "",
  chairType: null,
  depth: "",
  height: "",
  pressure: "Visco",
  backrest: "Waterfall",
  lateralSupport: "None",
  dropdownArmrest: false,
  profiledHeadrest: false,
  selectorView: null,
};

export const configStore = writable(initVal);
