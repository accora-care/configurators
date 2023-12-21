// store.js
import { writable } from "svelte/store";

export type SELECTOR_VIEW =
  | "SIDE_RAILS"
  | "SAFETY"
  | "MOBILITY"
  | "EXTRAS";

interface StoreValueOption {
	name: string;
	code: string;
}

interface SideRailStoreValueOption extends StoreValueOption {
	name:	SideRailStoreValue,
	code: string;
};

interface SafetyMatStoreValueOption extends StoreValueOption {
	name:	SafetyMatStoreValue,
	code: string;
};

interface LeverStoreValueOption extends StoreValueOption {
	name:	LeverStoreValue,
	code: string;
};

export type SideRailStoreValue = "Fabric Side Rails" | "Integrated Junior Padded Side Rails" | "None";
export type SafetyMatStoreValue = "High Safety Mat" | "High Safety Mat with Slide Sheets" | "None";
export type LeverStoreValue = "Bed Lever" | "Short Bed Lever" | "None";

export interface StoreValues {
  sideRails: SideRailStoreValue;
  bumpers: boolean;
  safetyMat: SafetyMatStoreValue;
	safetySleeve: boolean;
	juniorKit: boolean;
  lever: LeverStoreValue;
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
