import type { StoreValues } from "./configStore";

export const getHeadrestException = (state: StoreValues) => {
  if (state.backrest !== "Postural Backrest") {
    return "Only available with postural backrest.";
  }

  return null;
};
