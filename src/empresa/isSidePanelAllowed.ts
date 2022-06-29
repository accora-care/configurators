import type { StoreValues } from "./configStore";

export const isSidePanelAllowed = (state: StoreValues) => {
  if (state.variant === "ARC") {
    return false;
  }

  return true;
};
