// store.js
import { writable } from "svelte/store";

export type StoreValues = {
  headrest: boolean;
  lateralSupport: boolean;
  backrest: "normal" | "postural";
};

export const initVal: StoreValues = {
  headrest: false,
  lateralSupport: false,
  backrest: "normal",
};

export const configStore = writable(initVal);
