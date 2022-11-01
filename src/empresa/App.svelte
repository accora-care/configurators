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

  let valueSidePanels = "";
  let accessoriesDisplayValue = "none";
  let availableColors = [];

  configStore.subscribe((state) => {
    valueSidePanels = sidePanelExceptionReason(state) || state.sidePanel;
    availableColors = bedVariants[state.variant] || [];
    accessoriesDisplayValue =
      [
        $configStore.liftingPole === "Included" ? "Lifting pole" : null,
        $configStore.safetyMat === "Included" ? "Safety mat" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";
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
          value={accessoriesDisplayValue}
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
          {config.footerText ||
            "Quick Ship Options | 14 Day Free Trial | Assembly and Support"}
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
      font-size: 1.2rem;
      padding: 1.6rem;

      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .acc-form-content {
    padding: 2.4rem;
    padding-bottom: 0.4rem;
    border-radius: 0 0 var(--radius) var(--radius);
  }

  .acc-form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 1.6rem 3.2rem;
    text-align: center;
    border-radius: var(--radius) var(--radius) 0 0;
    color: white;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-weight: 400;
    @media screen and (max-width: 860px) {
      display: none;
    }
  }

  .acc-submit {
    margin-top: 1.6rem;
    background: white;
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 3.2rem;
    &-content {
      padding: 2.4rem;
    }
    .booking-info {
      font-weight: 300;
      text-align: center;
      font-size: 1.4rem;
      margin-top: 1.8rem;
    }
  }
  .acc-submit-button,
  .acc-submit-button:visited {
    background: var(--primary);
    font-size: 1.6rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    color: white;
    border-radius: 0.4rem;
    text-decoration: none !important;
    &:hover {
      box-shadow: inset 0 0 100px 0 rgba(0, 0, 0, 0.06);
    }
  }
</style>
