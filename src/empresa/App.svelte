<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore, initVal } from "./configStore";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAssisBar from "./Select/SelectAssistBar.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import SelectSide from "./Select/SelectSide.svelte";
  import SelectHeadboard from "./Select/SelectHeadboard.svelte";
  import type { InitConfig } from "./Config.types";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import { sidePanelExceptionReason } from "./isSidePanelAllowed";

  export let config: InitConfig;

  $: availableColors = bedVariants[$configStore.variant];
  let valueSidePanels = "";
  configStore.subscribe((state) => {
    valueSidePanels = sidePanelExceptionReason(state) || state.sidePanel;
  });
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-empresa" class="acc-content">
    <div class="acc-form">
      <div class="acc-form-title">{config.mainTitle}</div>
      <div class="acc-form-content">
        <CustomizationBlock
          title="Headboard"
          targetSelectView="HEADBOARD"
          value={$configStore.variant}
          length={Object.keys(bedVariants).length}
        />
        <SelectHeadboard />
        <CustomizationBlock
          title="Color"
          targetSelectView="COLOR"
          value={$configStore.color}
          length={availableColors.length}
        />
        <SelectPreviewColor colors={availableColors} />

        <CustomizationBlock
          title="Side Panels"
          targetSelectView="SIDE_PANEL"
          value={valueSidePanels}
          length={2}
        />
        <SelectSide />
        <CustomizationBlock
          title="Assist Bar"
          targetSelectView="ASSIST_BAR"
          value={$configStore.assistBar}
          length={2}
        />
        <SelectAssisBar bind:value={$configStore.assistBar} />

        <CustomizationBlock
          title="Accessories"
          targetSelectView="ACCESSORIES"
          value={$configStore.assistBar}
          length={2}
        />
        <SelectAccessories />
        <div
          class="reset-form"
          on:click={() => {
            configStore.update((s) => {
              return initVal;
            });
          }}
        >
          Reset to default options
        </div>
      </div>
    </div>
    <div class="acc-submit">
      <div class="acc-submit-content">
        <a class="acc-submit-button" href={config.bookADemoHref}>Book a demo</a>
        <p class="booking-info">
          Quick delivery | 100-night risk-free trial | Training &
          implementation.
        </p>
      </div>
    </div>
  </div>
</ConfiguratorContainer>

<style lang="scss" global>
  .acc-content {
    width: 40%;
    max-width: 550px;
    flex-shrink: 4;
    flex-grow: 0;
    min-width: 370px;
    @media screen and (max-width: 860px) {
      width: 100%;
      max-width: none;
      min-width: 0px;
    }
  }

  .acc-form {
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    & > *:last-child {
      border-bottom: none;
    }
    .reset-form {
      text-align: center;
      font-size: 0.75rem;
      padding: 1rem;

      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .acc-form-content {
    padding: 1.5rem;
    padding-bottom: 0.25rem;
    border-radius: 0 0 var(--radius) var(--radius);
  }

  .acc-form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 1rem 2rem;
    text-align: center;
    border-radius: var(--radius) var(--radius) 0 0;
    color: white;
    font-size: 18px;
    line-height: 1.5rem;
    font-weight: 400;
    @media screen and (max-width: 860px) {
      display: none;
    }
  }

  .acc-submit {
    margin-top: 1rem;
    background: white;
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 2rem;
    &-content {
      padding: 1.5rem;
    }

    &-button,
    &-button:visited {
      background: var(--primary);
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      border: none;
      margin: 0 auto;
      width: 100%;
      max-width: 200px;
      color: white;
      border-radius: 4px;
    }
    .booking-info {
      font-weight: 300;
      text-align: center;
      font-size: 0.875rem;
    }
  }
</style>
