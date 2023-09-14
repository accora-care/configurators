<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore, initVal } from "./configStore";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import SelectPreviewFabric from "./Select/SelectPreviewFabric.svelte";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectSide from "./Select/SelectSide.svelte";
  import SelectHeadboard from "./Select/SelectHeadboard.svelte";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import { sidePanelExceptionReason } from "./isSidePanelAllowed";
  import type { InitConfig } from "../Config.types";
  import Footer from "../components/Footer.svelte";
  import FormTitle from "../components/FormTitle.svelte";

  export let config: InitConfig;

  const fabricBedVariants = Object.keys(bedVariants.fabric);

  let valueSidePanels = "";
  let availableColors = [];
  let availableFabrics = [];

  $: isFabricBedVariant = fabricBedVariants.includes($configStore.variant);
  
  configStore.subscribe((state) => {
    valueSidePanels = sidePanelExceptionReason(state) || state.sidePanel;
    availableColors = bedVariants.wooden[state.variant] || [];
    availableFabrics = bedVariants.fabric[state.variant] || [];
  });
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-altida-uk" class="acc-content">
    <div class="acc-form">
      <FormTitle title={config.mainTitle} />
      <div class="acc-form-content">
        <CustomizationBlock
          title="Headboard & Footboard"
          targetSelectView="HEADBOARD"
          value={$configStore.variant}
          length={Object.keys(bedVariants.wooden).length + Object.keys(bedVariants.fabric).length}
        />
        <SelectHeadboard />
        <CustomizationBlock
          title="Wood Finish"
          targetSelectView="COLOR"
          value={$configStore.color}
          length={availableColors.length}
        />
        <SelectPreviewColor colors={availableColors} />
        <CustomizationBlock
          title="Fabric Finish"
          targetSelectView="FABRIC"
          value={$configStore.fabric}
          length={availableFabrics.length}
        />
        <SelectPreviewFabric fabrics={availableFabrics} />

        <CustomizationBlock
          title="Side Panels"
          targetSelectView="SIDE_PANEL"
          value={valueSidePanels}
          length={2}
        />
        <SelectSide />

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
    <Footer
      title="Altida (UK)"
      {config}
      descriptionFormField={[
        {
          label: "Headboard and footboard",
          value: $configStore.variant,
        },
        {
          label: isFabricBedVariant ? "Fabric Finish" : "Wood finish",
          value: isFabricBedVariant ? $configStore.fabric : $configStore.color,
        },
        {
          label: "Side panel",
          value: valueSidePanels,
        },
      ]}
    >
      <Preview />
    </Footer>
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
      font-size: calc(1.2rem / var(--root-font-size));
      padding: calc(1.6rem / var(--root-font-size));

      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
    }
  }
  .acc-form-content {
    padding: calc(2.4rem / var(--root-font-size));
    padding-bottom: calc(0.4rem / var(--root-font-size));
    border-radius: 0 0 var(--radius) var(--radius);
  }
</style>
