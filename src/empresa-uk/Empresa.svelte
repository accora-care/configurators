<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore, initVal } from "./configStore";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import SelectPreviewFabric from "./Select/SelectPreviewFabric.svelte";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  // import SelectAssistBar from "./Select/SelectAssistBar.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import SelectSide from "./Select/SelectSide.svelte";
  import SelectHeadboard from "./Select/SelectHeadboard.svelte";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import { sidePanelExceptionReason } from "./isSidePanelAllowed";
  import type { InitConfig } from "../Config.types";
  import Footer from "../components/Footer.svelte";
  import FormTitle from "../components/FormTitle.svelte";

  export let config: InitConfig;

  let valueSidePanels = "";
  let accessoriesDisplayValue = "none";
  let availableColors = [];
  let availableFabrics = [];

  configStore.subscribe((state) => {
    valueSidePanels = sidePanelExceptionReason(state) || state.sidePanel;
    availableColors = bedVariants.wooden[state.variant] || [];
    availableFabrics = bedVariants.fabric[state.variant] || [];
    accessoriesDisplayValue =
      [
        $configStore.proTectSideRail === "Included" ? "ProTect side rail" : null,
        $configStore.fabricSideRails === "Included" ? "Fabric side rails" : null,
        $configStore.foldingSideRails === "Included" ? "Folding side rails" : null,
        $configStore.foldingSideRailsWithBumper === "Included" ? "Folding side rails with bumper" : null,
        $configStore.widthAdjustmentKit === "Included" ? "Width adjustment kit" : null,
        $configStore.bedWallBumper === "Included" ? "Bed wall bumper" : null,
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

  <div id="acc-empresa-uk" class="acc-content">
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

        <CustomizationBlock
          title="Accessories"
          targetSelectView="ACCESSORIES"
          value={accessoriesDisplayValue}
          length={9}
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
    <Footer
      title="Empresa (UK)"
      {config}
      descriptionFormField={[
        {
          label: "Headboard and footboard",
          value: $configStore.variant,
        },
        {
          label: "Wood finish",
          value: $configStore.color,
        },
        {
          label: "Side panel",
          value: valueSidePanels,
        },
        {
          label: "Accessories - assist bar",
          value: $configStore.assistBar,
        },
        {
          label: "Accessories - other",
          value:
            [
              $configStore.proTectSideRail === "Included" ? "ProTect side rail" : null,
              $configStore.fabricSideRails === "Included" ? "Fabric side rails" : null,
              $configStore.foldingSideRails === "Included" ? "Folding side rails" : null,
              $configStore.foldingSideRailsWithBumper === "Included" ? "Folding side rails with bumper" : null,
              $configStore.widthAdjustmentKit === "Included" ? "Width adjustment kit" : null,
              $configStore.bedWallBumper === "Included" ? "Bed wall bumper" : null,
              $configStore.liftingPole === "Included" ? "Lifting pole" : null,
              $configStore.safetyMat === "Included" ? "Safety mat" : null,
            ]
              .filter((item) => !!item)
              .join(", ") || "None",
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
