import type { StoreValues } from "./configStore";

export const getLateralSupportBackrestsException = (state: StoreValues) => {
	if ("None" !== state.lateralSupport) {
    return "Not available with Lateral Support Wedges.";
	}

  return null;
};

export const getLateralSupportWedgesException = (state: StoreValues) => {
  if ("Lateral Support Backrest" === state.backrest || "Adjustable Lateral Support" === state.backrest) {
    return "Not available with Lateral Support Backrests.";
  }

  return null;
};
