import type { StoreValues } from "./configStore";

export const getHeadrestException = (state: StoreValues) => {
  if (state.backrest !== "Waterfall") {
    return "Only available with Waterfall backrest.";
  }

  return null;
};

export const getBackrestException = (state: StoreValues) => {
  if (state.profiledHeadrest) {
    return "Not available with Profiled Headrest.";
  }

  return null;
};
