import type { StoreValues } from "./configStore";

export const isSidePanelAllowed = (state: StoreValues) => {
  if (state.variant === "Arc") {
    return false;
  }

  return true;
};

export const sidePanelExceptionReason = (state: StoreValues) => {
  if (state.variant === "Arc") {
    return "Not available for Arc";
  }

  return null;
};
