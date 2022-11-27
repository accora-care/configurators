// store.js
import { writable } from "svelte/store";

export type Settings = {
  isQuoteOpen: string | null;
};

export const initSettings: Settings = {
  isQuoteOpen: null,
};

export const settingsStore = writable(initSettings);
