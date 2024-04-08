<script lang="ts">
  import { configStore, initVal } from "./configStore";

  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectSafety from "./Select/SelectSafety.svelte";
  import SelectSideRails from "./Select/SelectSideRails.svelte";
  import SelectMobility from "./Select/SelectMobility.svelte";
  import SelectExtras from "./Select/SelectExtras.svelte";
  import type { InitConfig } from "../Config.types";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import Footer from "../components/Footer.svelte";
  import FormTitle from "../components/FormTitle.svelte";

  import { getFabricSideRailsException } from "./isOptionAllowed";
  import { getBedExtensionKitProductCode, getBedExtensionProductCode, getBedProductCode, getBumpersProductCode, getJuniorKitProductCode, getLeverProductCode, getLiftingPoleProductCode, getMattressExtensionFoamProductCode, getMattressInfillProductCode, getPumpHolderProductCode, getSafetyMatProductCode, getSafetySleeveProductCode, getSideRailsProductCode } from "./getProductCode";

  export let config: InitConfig;

  let valueSideRails = "";
  let safetyDisplayValue = "None";
  let mobilityDisplayValue = "None";
  let extrasDisplayValue = "None";

  let bedProductCode = "";
  let sideRailsProductCode = "";
  let bumpersProductCode = "";
  let safetyMatProductCode = "";
  let safetySleeveProductCode = "";
  let juniorKitProductCode = "";
  let leverProductCode = "";
  let liftingPoleProductCode = "";
  let pumpHolderProductCode = "";
  let mattressInfillProductCode = "";
  let bedExtensionProductCode = "";
  let mattressExtensionFoamProductCode = "";
  let bedExtensionKitProductCode = "";

  configStore.subscribe((state) => {
    valueSideRails = getFabricSideRailsException(state) || state.sideRails;
    safetyDisplayValue =
      [
        $configStore.bumpers ? "Head and Foot Bumpers" : null,
        $configStore.safetyMat !== "None" ? $configStore.safetyMat : null,
        $configStore.safetySleeve ? "Safety Sleeve" : null,
        $configStore.juniorKit ? "JuniorKit" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";
    mobilityDisplayValue =
      [
        $configStore.lever !== "None" ? $configStore.lever : null,
        $configStore.liftingPole ? "Lifting Pole" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";
    extrasDisplayValue =
      [
        $configStore.pumpHolder ? "Mattress Pump Holder" : null,
        $configStore.mattressInfill ? "Mattress Infill" : null,
        $configStore.bedExtension ? "Bed Extension" : null,
        $configStore.mattressExtensionFoam ? "Mattress Extension Foam" : null,
        $configStore.bedExtensionKit ? "Bed Extension Kit" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";

      bedProductCode = getBedProductCode();
      sideRailsProductCode = getSideRailsProductCode(state);
      bumpersProductCode = getBumpersProductCode(state);
      safetyMatProductCode = getSafetyMatProductCode(state);
      safetySleeveProductCode = getSafetySleeveProductCode(state);
      juniorKitProductCode = getJuniorKitProductCode(state);
      leverProductCode = getLeverProductCode(state);
      liftingPoleProductCode = getLiftingPoleProductCode(state);
      pumpHolderProductCode = getPumpHolderProductCode(state);
      mattressInfillProductCode = getMattressInfillProductCode(state);
      bedExtensionProductCode = getBedExtensionProductCode(state);
      mattressExtensionFoamProductCode = getMattressExtensionFoamProductCode(state);
      bedExtensionKitProductCode = getBedExtensionKitProductCode(state);
  });
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-floorbed1-uk" class="acc-content">
    <div class="acc-form">
      <div class="acc-form-content">
        <CustomizationBlock
          title="Side Rails"
          targetSelectView="SIDE_RAILS"
          value={valueSideRails}
          length={2}
        />
        <SelectSideRails />
        <CustomizationBlock
          title="Safety"
          targetSelectView="SAFETY"
          value={safetyDisplayValue}
          length={5}
        />
        <SelectSafety />
        <CustomizationBlock
          title="Mobility"
          targetSelectView="MOBILITY"
          value={mobilityDisplayValue}
          length={3}
        />
        <SelectMobility />
        <CustomizationBlock
          title="Extras"
          targetSelectView="EXTRAS"
          value={extrasDisplayValue}
          length={5}
        />
        <SelectExtras />
        <div
          class="reset-form"
          on:click={() => {
            initVal.selectorView = $configStore.selectorView;

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
      title="Floorbed 1 (UK)"
      {config}
      ukStyle={true}
      descriptionFormField={[
        {
          label: "Bed",
          value: "FloorBed 1",
          code: bedProductCode,
        },
        {
          label: "Side Rails",
          value: "None" !== $configStore.sideRails ? $configStore.sideRails : null,
          code: sideRailsProductCode,
        },
        {
          label: "Head and Foot Bumpers",
          value: $configStore.bumpers ? "Included" : null,
          code: bumpersProductCode,
        },
        {
          label: "Safety Mat",
          value: "None" !== $configStore.safetyMat ? $configStore.safetyMat :  null,
          code: safetyMatProductCode,
        },
        {
          label: "Safety Sleeve",
          value: $configStore.safetySleeve ? "Included" : null,
          code: safetySleeveProductCode,
        },
        {
          label: "JuniorKit",
          value: $configStore.juniorKit ? "Included" : null,
          code: juniorKitProductCode,
        },
        {
          label: "Bed Lever",
          value: "None" !== $configStore.lever ? $configStore.lever : null,
          code: leverProductCode,
        },
        {
          label: "Lifting Pole",
          value: $configStore.liftingPole ? "Included" : null,
          code: liftingPoleProductCode,
        },
        {
          label: "Mattress Pump Holder",
          value: $configStore.pumpHolder ? "Included" : null,
          code: pumpHolderProductCode,
        },
        {
          label: "Mattress Infill",
          value: $configStore.mattressInfill ? "Included" : null,
          code: mattressInfillProductCode,
        },
        {
          label: "Bed Extension",
          value: $configStore.bedExtension ? "Included" : null,
          code: bedExtensionProductCode,
        },
        {
          label: "Mattress Extension Foam",
          value: $configStore.mattressExtensionFoam ? "Included" : null,
          code: mattressExtensionFoamProductCode,
        },
        {
          label: "Bed Extension Kit",
          value: $configStore.bedExtensionKit ? "Included" : null,
          code: bedExtensionKitProductCode,
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
    padding: calc(0.4rem / var(--root-font-size)) calc(2.4rem / var(--root-font-size));
    border-radius: 0 0 var(--radius) var(--radius);
  }
</style>
