// store.js
import { writable } from "svelte/store";

export type StoreValues = {
  headrest: boolean;
  lateralSupport: boolean;
  backrest: "normal" | "postural";
  dropdownArmrest: boolean;
};

export const initVal: StoreValues = {
  headrest: false,
  lateralSupport: false,
  backrest: "normal",
  dropdownArmrest: false,
};

export const configStore = writable(initVal);
