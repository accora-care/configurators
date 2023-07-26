import type { StoreValues } from "./configStore";

export const assistBarLongException = (state: StoreValues) => {
  if (state.sidePanel === "Included") {
    return "Not available with side panel";
  }

  return null;
};
