import type { StoreValues } from "./configStore";

export const assistBarLongException = (state: StoreValues) => {
  if (state.sidePanel === "With Side Panels") {
    return "Non disponible avec longs pans";
  }

  return null;
};
