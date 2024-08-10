import type { StoreValues } from "./configStore";
import { productCodes } from "./data/productCodes";

export const getSizeProductCode = (state: StoreValues): string | null => {
  const mediatric = {
    24: !state.vinyl ? "CHAIR-0-CM4-440" : "CHAIR-0-CM4-430VN",
    26: !state.vinyl ? "CHAIR-0-CM4-540" : "CHAIR-0-CM4-530VN",
  };

  const fabric = !state.vinyl ? 'duratek' : 'vinyl';

  const heightType = !['Configura Comfort Medium', 'Configura Comfort Large'].includes(state.chairType) ? 'commonHeights' : 'mediumLargeHeights';

  let productCodesList: Array<string> = [];


  const chairTypeCode = productCodes[fabric][state.chairType];
  if (chairTypeCode) productCodesList.push(chairTypeCode);

  if (state.chairType === "Configura Mediatric") {
    const mediatricCode = mediatric[state.width];
    if (mediatricCode) productCodesList.push(mediatricCode);
  }

  const heightCode = productCodes[heightType][state.height];
  if (heightCode) productCodesList.push(heightCode);

  const depthCode = productCodes.depth[state.depth];
  if (depthCode) productCodesList.push(depthCode);

  return productCodesList.length ? productCodesList.join(", ") : null;
};

export const getPressureProductCode = (state: StoreValues): string | null => {
  switch (state.pressure) {

    case "CushionAir":
      return "KITCA-M-DU1-000X";

    case "Allevia Duo Cushion":
      return "KITCA-0-CM1-100X";

    default:
      return null;
  }
}

export const getBackrestProductCode = (state: StoreValues): string | null => {
  switch (state.backrest) {

    case "Cocoon":
      return "COCBR-0-SC1-020";

    default:
      return null;
  }
}

export const getLateralSupportProductCode = (state: StoreValues): string | null => {
  switch (state.lateralSupport) {

    case "Lateral Support Wedges":
      return "MALLS-0-CM1-000X";

    default:
      return null;
  }
}

export const getProfiledHeadrestProductCode = (state: StoreValues): string | null => {
  return state.profiledHeadrest ? "HRPF-0-CM1-120" : null;
}