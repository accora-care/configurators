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
	width: 18 | 20 | 22 | null;
	depth: 18 | 20 | null;
	height: 15 | 16 | 17 | 18 | 19 | 20 | null;
	pressure: "Visco" | "CushionAir" | "Allevia Duo Cushion";
	backrest: BACKREST_OPTIONS;
	lateralSupport: "Lateral Support Wedges" | "None";
  dropdownArmrest: boolean;
  profiledHeadrest: boolean;
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
	vinyl: false,
	width: null,
	depth: null,
	height: null,
	pressure: "Visco",
	backrest: "Waterfall",
	lateralSupport: "None",
  dropdownArmrest: false,
  profiledHeadrest: false,
	selectorView: null,
};

export const configStore = writable(initVal);
