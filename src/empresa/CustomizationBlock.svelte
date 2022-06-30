<script lang="ts">
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
  import Chevron from "./assets/chevron.svg";

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
  class="acc-customization-select"
  class:active={$configStore.selectorView === targetSelectView}
  on:click={() => {
    configStore.update((s) => {
      if (s.selectorView === "COLOR") {
        // color was too long, collapsed color will not move the scroll, we do it manually
        try {
          document.getElementById("acc-empresa").scrollIntoView({
            behavior: "smooth",
          });
        } catch {}
      }
      return {
        ...s,
        selectorView:
          s.selectorView === targetSelectView ? null : targetSelectView,
      };
    });
  }}
>
  <div class="acc-customization-icon-container">
    <Icon class="acc-customization-icon-container__icon" />
  </div>

  <div class="acc-customization-content">
    <div class="title">{title}</div>
    <div class="value">
      {value}
    </div>
  </div>
  <div class="acc-select-container">
    <div class="acc-select-container__sticker">
      {length} options
      <span class="acc-select-container__sticker__available"
        >&nbsp;available</span
      >
    </div>
    <Chevron class="acc-chevron" />
  </div>
</div>

<style lang="scss" global>
  .acc-customization-content {
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 1rem;
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
  }

  .acc-customization-select {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-right: 1rem;
    cursor: pointer;
  }
  .acc-customization-icon-container {
    padding: 1rem;
    flex-shrink: 0;
    @media screen and (max-width: 1200px) {
      padding-left: 0;
    }
  }

  .acc-customization-select.active {
    .value,
    .title {
      color: var(--primary);
    }

    .acc-chevron {
      transform: rotate(180deg);
    }
    path {
      fill: var(--primary);
    }
  }

  .acc-customization-select:hover {
    .title {
      color: var(--primary);
    }
  }
  .acc-chevron {
    cursor: pointer;
    transition: 0.2s all;
  }

  // select container
  .acc-select-container {
    height: 24px;
    flex-grow: 1;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .acc-select-container__sticker {
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
      .acc-select-container__sticker__available {
        @media screen and (max-width: 1200px) {
          display: none;
        }
      }
    }
  }
</style>
