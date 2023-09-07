// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "SIDE_RAILS"
  | "SAFETY"
  | "MOBILITY"
  | "EXTRAS";

export type StoreValues = {
  sideRails: "Fabric" | "Junior" | "None";
  bumpers: boolean;
  safetyMat: "High" | "High with Slide Sheets" | "None";
	safetySleeve: boolean;
	juniorKit: boolean;
  lever: "Standard" | "Short" | "None";
  liftingPole: boolean;
  pumpHolder: boolean;
	mattressInfill: boolean;
	bedExtension: boolean;
	mattressExtensionFoam: boolean;
	bedExtensionKit: boolean;
  selectorView: SELECTOR_VIEW | null;
};

export const initVal: StoreValues = {
  sideRails: "None",
  bumpers: false,
  safetyMat: "None",
	safetySleeve: false,
	juniorKit: false,
  lever: "None",
  liftingPole: false,
  pumpHolder: false,
	mattressInfill: false,
	bedExtension: false,
	mattressExtensionFoam: false,
	bedExtensionKit: false,
	selectorView: null,
};

export const configStore = writable(initVal);
