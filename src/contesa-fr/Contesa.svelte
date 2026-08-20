<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore, initVal } from "./configStore";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  // import SelectAssistBar from "./Select/SelectAssistBar.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import SelectSide from "./Select/SelectSide.svelte";
  import SelectHeadboard from "./Select/SelectHeadboard.svelte";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import { sidePanelExceptionReason } from "./isSidePanelAllowed";
  import { colorLabels } from "./data/colorLabels";
  import type { InitConfig } from "../Config.types";
  import Footer from "./Footer.svelte";
  import FormTitle from "../components/FormTitle.svelte";

  export let config: InitConfig;

  let valueSidePanels = "";
  let accessoriesDisplayValue = "none";
  let availableColors = [];

  const sidePanelDisplayValues: Record<string, string> = {
    "No Side Panels": "Sans longs pans",
    "With Side Panels": "Avec longs pans",
  };

  configStore.subscribe((state) => {
    const raw = sidePanelExceptionReason(state) || state.sidePanel;
    valueSidePanels = sidePanelDisplayValues[raw] || raw;
    availableColors = bedVariants.wooden[state.variant] || [];
    accessoriesDisplayValue =
      [
        $configStore.proTectSideRail === "Included"
          ? "Barrière latérale ProTect"
          : null,
        $configStore.fabricSideRails === "Included"
          ? "Barrières latérales en tissu"
          : null,
        $configStore.foldingSideRails === "Included"
          ? "Barrière ¾ escamotables"
          : null,
        $configStore.foldingSideRailsWithBumper === "Included"
          ? "Barrière ¾ escamotables avec pare-chocs"
          : null,
        $configStore.widthAdjustmentKit === "Included"
          ? "Kit d'élargissement"
          : null,
        $configStore.bedWallBumper === "Included" ? "Butoir de lit" : null,
        $configStore.liftingPole === "Included" ? "Potence" : null,
        $configStore.safetyMat === "Included" ? "Prolongement de matelas" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "Aucun";
  });

  const resetOptions = () => {
    initVal.selectorView = $configStore.selectorView;

    configStore.update((s) => {
      return initVal;
    });
  };
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-contesa-fr" class="acc-content">
    <div class="acc-form">
      <div class="acc-form-content">
        <CustomizationBlock
          title="Tête et pied de lit"
          targetSelectView="HEADBOARD"
          value={$configStore.variant}
          length={Object.keys(bedVariants.wooden).length}
        />
        <SelectHeadboard />
        <CustomizationBlock
          title="Finitions en bois"
          targetSelectView="COLOR"
          value={colorLabels[$configStore.color] || $configStore.color}
          length={availableColors.length}
        />
        <SelectPreviewColor colors={availableColors} />
        <CustomizationBlock
          title="Longs pans"
          targetSelectView="SIDE_PANEL"
          value={valueSidePanels}
          length={2}
        />
        <SelectSide />

        <CustomizationBlock
          title="Accessoires"
          targetSelectView="ACCESSORIES"
          value={accessoriesDisplayValue}
          length={6}
        />
        <SelectAccessories />
        <div class="reset-form" on:click={() => resetOptions()}>
          Réinitialiser les options par défaut
        </div>
      </div>
    </div>
    <Footer
      title="Contesa (FR)"
      {config}
      ukStyle={true}
      submitButtonText="Demander un devis"
      descriptionFormField={[
        {
          label: "Tête et pied de lit",
          value: $configStore.variant,
        },
        {
          label: "Finitions en bois",
          value: $configStore.color,
        },
        {
          label: "Longs pans",
          value: valueSidePanels,
        },
        {
          label: "Accessoires",
          value:
            [
              $configStore.assistBar !== "None" ? "Barre d'appui fixe" : null,
              $configStore.proTectSideRail === "Included"
                ? "Barrière latérale ProTect"
                : null,
              $configStore.fabricSideRails === "Included"
                ? "Barrières latérales en tissu"
                : null,
              $configStore.foldingSideRails === "Included"
                ? "Barrière ¾ escamotables"
                : null,
              $configStore.foldingSideRailsWithBumper === "Included"
                ? "Barrière ¾ escamotables avec pare-chocs"
                : null,
              $configStore.widthAdjustmentKit === "Included"
                ? "Kit d'élargissement"
                : null,
              $configStore.bedWallBumper === "Included"
                ? "Butoir de lit"
                : null,
              $configStore.liftingPole === "Included" ? "Potence" : null,
              $configStore.safetyMat === "Included" ? "Prolongement de matelas" : null,
            ]
              .filter((item) => !!item)
              .join(", ") || "Aucun",
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
    background: #fff;
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
    padding: calc(0.4rem / var(--root-font-size))
      calc(2.4rem / var(--root-font-size));
    border-radius: 0 0 var(--radius) var(--radius);
  }
</style>
