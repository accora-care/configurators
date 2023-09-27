import type { StoreValues } from "./configStore";

export const assistBarLongException = (state: StoreValues) => {
  if (state.sidePanel === "With Side Panels") {
    return "Not available with side panel";
  }

  return null;
};
