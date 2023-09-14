// Side Rails

import type { StoreValues } from "./configStore";

export const getFabricSideRailsException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Not available with Junior Kit";
  }

  return null;
};

// Safety

export const getBumpersException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Included with Junior Kit";
  } else if (state.pumpHolder) {
    return "Not available with Mattress Pump Holder";
  }

  return null;
};

export const getSafetySleeveException = (state: StoreValues) => {
  if (state.juniorKit) {
    return "Included with Junior Kit";
  } else if (state.lever !== "None" || state.liftingPole) {
    return "Not available with mobility options";
	}

  return null;
};

export const getJuniorKitException = (state: StoreValues) => {
  if (state.sideRails === "Fabric Side Rails") {
    return "Not available with Fabric Side Rails";
  } else if (state.lever !== "None" || state.liftingPole) {
    return "Not available with mobility options";
	}

  return null;
};

// Mobility

export const getMobilityOptionsException = (state: StoreValues) => {
  if (state.safetySleeve) {
    return "Not available with Safety Sleeve";
  }

  return null;
};

// Extras

export const getPumpHolderException = (state: StoreValues) => {
  if (state.bumpers) {
    return "Not available with Head and Footboard Bumpers";
  }

  return null;
};

export const getBedExtensionException = (state: StoreValues) => {
  if (state.bedExtensionKit) {
    return "Included with Bed Extension Kit";
  } else if (state.safetySleeve) {
    return "Not available with Safety Sleeve";
  }

  return null;
};

export const getMattressExtensionFoamException = (state: StoreValues) => {
  if (state.bedExtensionKit) {
    return "Included with Bed Extension Kit";
  } else if (state.safetySleeve) {
    return "Not available with Safety Sleeve";
  }

  return null;
};

export const getBedExtensionKitException = (state: StoreValues) => {
  if (state.safetySleeve) {
    return "Not available with Safety Sleeve";
  }

  return null;
};
