// Side Rails

import type { StoreValues } from "./configStore";

export const getFabricSideRailsException = (state: StoreValues) => {
  return null;
}

export const getJuniorPaddedSideRailsException = (state: StoreValues) => {
  if (state.bedExtension || state.bedExtensionKit || state.mattressExtensionFoam) {
    return "Not available with Bed Extension"
  }

  return null;
};

// Safety

export const getBumpersException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Included with JuniorKit";
  }

  return null;
};

export const getSafetySleeveException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Included with JuniorKit";
  } else if (state.lever !== "None" || state.liftingPole) {
    return "Not available with mobility options";
  } else if (state.bedExtension || state.bedExtensionKit || state.mattressExtensionFoam) {
    return "Not available with Bed Extension"
  }

  return null;
};

export const getJuniorKitException = (state: StoreValues) => {
  if (state.lever !== "None" || state.liftingPole) {
    return "Not available with mobility options";
  } else if (state.bedExtension || state.bedExtensionKit || state.mattressExtensionFoam) {
    return "Not available with Bed Extension"
  }

  return null;
};

// Mobility

export const getMobilityOptionsException = (state: StoreValues) => {
  if (state.safetySleeve || state.juniorKit) {
    return "Not available with Safety Sleeve or JuniorKit";
  }

  return null;
};

// Extras

export const getMatressInfillException = (state: StoreValues) => {
  if ("Fabric Side Rails" !== state.sideRails) {
    return "Only available with Fabric Side Rails";
  }

  return null;
};

export const getBedExtensionException = (state: StoreValues) => {
  if (state.bedExtensionKit) {
    return "Included with Bed Extension Kit";
  } else if (state.safetySleeve || state.juniorKit) {
    return "Not available with Safety Sleeve or JuniorKit";
  } else if ("Integrated Junior Padded Side Rails" === state.sideRails) {
    return "Not available with Integrated Junior Padded Side Rails";
  }

  return null;
};

export const getMattressExtensionFoamException = (state: StoreValues) => {
  if (state.bedExtensionKit) {
    return "Included with Bed Extension Kit";
  } else if (state.safetySleeve || state.juniorKit) {
    return "Not available with Safety Sleeve or JuniorKit";
  } else if ("Integrated Junior Padded Side Rails" === state.sideRails) {
    return "Not available with Integrated Junior Padded Side Rails";
  }

  return null;
};

export const getBedExtensionKitException = (state: StoreValues) => {
  if (state.safetySleeve || state.juniorKit) {
    return "Not available with Safety Sleeve or JuniorKit";
  } else if ("Integrated Junior Padded Side Rails" === state.sideRails) {
    return "Not available with Integrated Junior Padded Side Rails";
  }

  return null;
};

// Mattresses

export const getMattressesException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Not available with JuniorKit";
  }

  return null;
}
