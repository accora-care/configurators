// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "SIDE_RAILS"
  | "SAFETY"
  | "MOBILITY"
  | "EXTRAS";

export type StoreValues = {
  sideRails: "Fabric Side Rails" | "Integrated Junior Padded Side Rails" | "None";
  bumpers: boolean;
  safetyMat: "High Safety Mat" | "High Safety Mat with Slide Sheets" | "None";
	safetySleeve: boolean;
	juniorKit: boolean;
  lever: "Bed Lever" | "Short Bed Lever" | "None";
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
