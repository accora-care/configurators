import type { SELECTOR_VIEW } from "../configStore";
import IconHeadboard from "./assets/icon-headboard.svg";
import IconColor from "./assets/icon-color.svg";
import IconSafety from "./assets/icon-safety.svg";
import IconSidepanels from "./assets/icon-sidepanels.svg";
import IconAccessory from "./assets/icon-accessory.svg";

export const icons: { [key in SELECTOR_VIEW]: typeof IconHeadboard } = {
  COLOR: IconColor,
  ACCESSORIES: IconAccessory,
  SIDE_PANEL: IconSidepanels,
  ASSIST_BAR: IconSafety,
  HEADBOARD: IconHeadboard,
};
