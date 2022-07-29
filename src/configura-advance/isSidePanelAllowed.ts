import type { StoreValues } from "./configStore";

export const isSidePanelAllowed = (state: StoreValues) => {
  if (state.variant === "ARC") {
    return false;
  }

  return true;
};

export const sidePanelExceptionReason = (state: StoreValues) => {
  if (state.variant === "ARC") {
    return "Not available for ARC";
  }

  return null;
};
