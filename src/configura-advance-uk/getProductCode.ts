import type { StoreValues } from "./configStore";

export const getChairProductCode = (): string | null => {
	return null;
}

export const getMechanismProductCode = (state: StoreValues): string | null => {
	return state.electric ? "CHAIR-0-SC2-030" : "CHAIR-0-SC1-030";
}

export const getPressureProductCode = (state: StoreValues): string | null => {
	switch (state.pressure) {

		case "CushionAir":
			return "KITCA-0-SC1-000";

		case "Allevia Duo Cushion":
			return "KITCA-P-DU1-000";

		default:
			return null;
	}
}

export const getBackrestProductCode = (state: StoreValues): string | null => {
	switch (state.backrest) {

		case "Postural Backrest":
			return "BRPOSKT-0-SC1-030";

		case "Cocoon":
			return "COCBR-0-SC1-020";

		case "Lateral Support Backrest":
			return "BRLSB-0-CM1-XXX";

		case "Adjustable Lateral Support":
			return "BRMAL-0-CF1-XXX";

		default:
			return null;
	}
}

export const getLateralSupportProductCode = (state: StoreValues): string | null => {
	switch (state.lateralSupport) {

		case "Lateral Support Wedges":
			return "MALLS-0-CF1-000";

		case "External Lateral Supports":
			return "EXTLAT-0-SC1-020";

		default:
			return null;
	}
}

export const getProfiledHeadrestProductCode = (state: StoreValues): string | null => {
	return state.profiledHeadrest
		? "Postural Backrest" === state.backrest
			? "HRPF-0-CM1-020X"
			: "HRPF-0-CM1-120"
		: null;
}

export const getArmrestsProductCode = (state: StoreValues): string | null => {
	return state.dropdownArmrest ?  "DRPSIDKT-0-SC1-XXX & DRPARM-0-SC1-XXX" : null;
}

export const getAccessoriesProductCode = (state: StoreValues): string | null => {
	let productCodes: Array<string> = [];

	if (state.pelvicStrap) {
		productCodes.push("PELVS4-0-SC1-000X");
	};

	if (state.tray) {
		productCodes.push("TRAY-0-SC1-000");
	};

	if (state.environmentalControlInterface) {
		productCodes.push("CNTENV-0-SC2-000");
	};

	return productCodes.length ? productCodes.join(", ") : null;
}
