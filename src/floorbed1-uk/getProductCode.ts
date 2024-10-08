import type { StoreValues } from "./configStore";

export const getBedProductCode = (): string | null => {
  return "NSB-0-FL1-200";
}

export const getSideRailsProductCode = (state: StoreValues): string | null => {
  switch (state.sideRails) {

    case "Fabric Side Rails":
      if (state.bedExtension || state.bedExtensionKit) {
        return "SDREX-0-FL1-100";
      }
      return "SDR-0-FL1-100";

    case "Integrated Junior Padded Side Rails":
      return "SDR-0-FL4-000";

    default:
      return null;
  }
}

export const getBumpersProductCode = (state: StoreValues): string | null => {
  return state.bumpers ? "BMHNE-0-FL4-000" : null;
}

export const getSafetyMatProductCode = (state: StoreValues): string | null => {
  switch (state.safetyMat) {

    case "High Safety Mat":
      return "SAFTH-0-FL1-100";

    case "High Safety Mat with Slide Sheets":
      return "SAFTHSS-0-FL1-000";

    default:
      return null;
  }
}

export const getSafetySleeveProductCode = (state: StoreValues): string | null => {
  return state.safetySleeve ? "SLE-0-FL4-100" : null;
}

export const getJuniorKitProductCode = (state: StoreValues): string | null => {
  return state.juniorKit ? "JUNKIT-0-FL1-000" : null;
}

export const getLeverProductCode = (state: StoreValues): string | null => {
  switch (state.lever) {

    case "Bed Lever":
      return "STLEV-0-FL1-000";

    case "Short Bed Lever":
      return "STLEVS-0-FL1-000";

    default:
      return null;
  }
}

export const getLiftingPoleProductCode = (state: StoreValues): string | null => {
  return state.liftingPole ? "LIFOL-0-FL1-000" : null;
}

export const getPumpHolderProductCode = (state: StoreValues): string | null => {
  return state.pumpHolder ? "PUMPHOL-0-FL1-000" : null;
}

export const getMattressInfillProductCode = (state: StoreValues): string | null => {
  return state.mattressInfill ? "MTINF-0-FL1-000" : null;
}

export const getBedExtensionProductCode = (state: StoreValues): string | null => {
  return state.bedExtension ? "LRPEX-0-FL1-100" : null;
}

export const getMattressExtensionFoamProductCode = (state: StoreValues): string | null => {
  return state.mattressExtensionFoam ? "FOAMEX-0-FM1-100" : null;
}

export const getBedExtensionKitProductCode = (state: StoreValues): string | null => {
  return state.bedExtensionKit ? "SDEXKIT-0-FL1-100" : null;
}


export const getMattressesProductCode = (state: StoreValues): string | null => {
  switch (state.mattresses) {

    case "Allevia Comfort":
      return "VISMAT-0-FM5-000"

    case "Allevia Comfort FirmEdge":
      return "VISMATB-0-FM5-000"

    case "Allevia Duo":
      if (state.pumpOption === "withoutPump") {
        return "AIRFOA-0-AF2-000";
      }
      return "AIRFOAP-0-AF2-000";

    case "Allevia Duo Plus":
      if (state.pumpOption === "withoutPump") {
        return "AIRVIS-0-AF3-000";
      }
      return "AIRVISP-0-AF3-000";

    case "Allevia Sense":
      return "AIRMATP-0-AM3-000";

    default:
      return null;
  }
}