// store.js
import { writable } from "svelte/store";

export type StoreValues = {
  lever: boolean;
  bumpers: boolean;
  liftingPole: boolean;
  sideRails: boolean;
  pumpHolder: boolean;
  safetyMat: boolean;
};

export const initVal: StoreValues = {
  lever: false,
  bumpers: false,
  liftingPole: false,
  sideRails: false,
  pumpHolder: false,
  safetyMat: false,
};

export const configStore = writable(initVal);
