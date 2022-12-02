// store.js
import { writable } from "svelte/store";

export type StoreValues = {
  lever: boolean;
  bumpers: boolean;
  liftingPole: boolean;
  pumpHolder: boolean;
  safetyMat: boolean;
  sideRails: boolean;
};

export const initVal: StoreValues = {
  lever: false,
  bumpers: false,
  liftingPole: false,
  pumpHolder: false,
  safetyMat: false,
  sideRails: false,
};

export const configStore = writable(initVal);
