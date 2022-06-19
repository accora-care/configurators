<script lang="ts">
  import Chevron from "./assets/chevron.svg";

  export let length: number;
  export let title: string;
  export let value: string;
  export let targetSelectView: SELECTOR_VIEW;
  import { configStore, SELECTOR_VIEW } from "./configStore";

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
  const Icon = icons[targetSelectView];
</script>

<div
  class={$configStore.selectorView === targetSelectView
    ? "customization-block active"
    : "customization-block"}
  on:click={() => {
    configStore.update((s) => ({
      ...s,
      selectorView: targetSelectView,
    }));
  }}
>
  <div class="iconContainer">
    <Icon class="icon" />
  </div>

  <div class="item-content">
    <div class="title">{title}</div>
    <div class="value">
      {value}
    </div>
  </div>
  <div class="custom-select-container">
    <div class="sticker">
      {length} options <span class="available">&nbsp;available</span>
    </div>
    <Chevron class="chvrn" />
  </div>
</div>

<style lang="scss">
  .available {
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .item-content {
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 1rem;
  }

  .title {
    font-weight: 500;
    font-size: 16px;
  }
  .value {
    font-size: 14px;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .customization-block {
    display: flex;
    align-items: center;
    border-top: 1px solid var(--border-color);
    padding-right: 1rem;
    cursor: pointer;
    & + & {
      border-top: 1px solid rgba(235, 236, 239, 1);
      padding-top: 1rem;
      margin-top: 1rem;
    }
  }
  .iconContainer {
    padding: 1rem;
    flex-shrink: 0;
    @media screen and (max-width: 1200px) {
      padding-left: 0;
    }
  }

  :global(.active) {
    .value,
    .title {
      color: var(--primary);
    }
  }

  :global(.customization-block.active path) {
    fill: var(--primary);
  }
  /* :global {
    path {
      fill: var(--primary) !important;
    }
  } */
  .customization-block:hover {
    .title {
      color: var(--primary);
    }
  }
  .custom-select-container {
    height: 24px;
    flex-grow: 1;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .sticker {
      background: #f6f6f6;
      border-radius: 5px;
      height: 100%;
      pointer-events: none;
      padding: 0 0.5rem;
      right: 32px;
      margin-right: 1rem;

      white-space: nowrap;

      /* 6 options available */

      display: flex;
      align-items: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;

      color: #333232;
    }
  }
  :global(.chvrn) {
    /* transform: translateY(-50%); */
    cursor: pointer;
  }
</style>
