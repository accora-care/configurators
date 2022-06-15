// store.js
import { writable } from "svelte/store";

import { sidePanels } from "./data/sidePanels";

export const configStore = writable({
  variant: "Atelier",
  color: "Anthracite Fineline Metallic",
  sidePanel: sidePanels[0].title,
  liftingPole: "true",
  safetyMat: "false",
  assistBar: "Long",
});
