// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "MECHANISM"
  | "SIZE"
  | "PRESSURE"
  | "POSTURE"
  | "ARMRESTS"
  | "ACCESSORIES";

export type BACKREST_OPTIONS =
  | "Waterfall" | "Cocoon" | "Postural Backrest" | "Lateral Support Backrest" | "Adjustable Lateral Support";

export type StoreValues = {
	electric: boolean;
	width: 16 | 18 | 20 | 22;
	depth: 16 | 17 | 18 | 19 | 20 | 21;
	height: 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
	pressure: "Visco" | "CushionAir" | "Allevia Duo Cushion";
	backrest: BACKREST_OPTIONS;
	lateralSupport: "External Lateral Supports" | "Lateral Support Wedges" | "None";
  dropdownArmrest: boolean;
  profiledHeadrest: boolean;
  pelvicStrap: boolean;
  tray: boolean;
  environmentalControlInterface : boolean;
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
	electric: false,
	width: 16,
	depth: 16,
	height: 13,
	pressure: "Visco",
	backrest: "Waterfall",
	lateralSupport: "None",
  dropdownArmrest: false,
  profiledHeadrest: false,
  pelvicStrap: false,
  tray: false,
  environmentalControlInterface : false,
	selectorView: null,
};

export const configStore = writable(initVal);
