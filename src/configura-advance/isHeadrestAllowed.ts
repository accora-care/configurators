import type { StoreValues } from "./configStore";

export const getHeadrestException = (state: StoreValues) => {
  if (state.backrest !== "postural") {
    return "Not available with waterfall backrest.";
  }

  return null;
};
