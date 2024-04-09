<script lang="ts">
  import { configStore, initVal } from "./configStore";

  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import Footer from "../components/Footer.svelte";
  import type { InitConfig } from "../Config.types";
  import SelectBackrest from "./Select/SelectPosture.svelte";
  import SelectPressure from "./Select/SelectPressure.svelte";
  import SelectArmrests from "./Select/SelectArmrests.svelte";
  import SelectMechanism from "./Select/SelectMechanism.svelte";
  import SelectSize from "./Select/SelectSize.svelte";
  import {
    getChairProductCode,
    getMechanismProductCode,
    getPressureProductCode,
    getBackrestProductCode,
    getLateralSupportProductCode,
    getProfiledHeadrestProductCode,
    getArmrestsProductCode,
    getAccessoriesProductCode,
  } from "./getProductCode";

  export let config: InitConfig;

  let sizeDisplayValue = "";
  let postureDisplayValue = "Waterfall";
  let accessoriesDisplayValue = "none";

  let chairProductCode = "";
  let mechanismProductCode = "";
  let pressureProductCode = "";
  let backrestProductCode = "";
  let lateralSupportProductCode = "";
  let profiledHeadrestProductCode = "";
  let armrestsProductCode = "";
  let accessoriesProductCode = "";

  configStore.subscribe((state) => {
    sizeDisplayValue =
      [
        $configStore.width ? `Width ${$configStore.width}"` : null,
        $configStore.depth ? `Depth ${$configStore.depth}"` : null,
        $configStore.height ? `Height ${$configStore.height}"` : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "Not selected";

    postureDisplayValue =
      [
        $configStore.backrest,
        $configStore.lateralSupport !== "None" ? $configStore.lateralSupport : null,
        $configStore.profiledHeadrest ? "Profiled Headrest" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";

    accessoriesDisplayValue =
      [
        $configStore.pelvicStrap ? "Pelvic Strap" : null,
        $configStore.tray ? "Tray" : null,
        $configStore.environmentalControlInterface ? "Environmental Control Interface" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";

    chairProductCode = getChairProductCode();
    mechanismProductCode = getMechanismProductCode(state);
    pressureProductCode = getPressureProductCode(state);
    backrestProductCode = getBackrestProductCode(state);
    lateralSupportProductCode = getLateralSupportProductCode(state);
    profiledHeadrestProductCode = getProfiledHeadrestProductCode(state);
    armrestsProductCode = getArmrestsProductCode(state);
    accessoriesProductCode = getAccessoriesProductCode(state);
});
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-configura-advance-uk" class="acc-content">
    <div class="acc-form">
      <div class="acc-form-content">
        <CustomizationBlock
          title="Mechanism"
          targetSelectView="MECHANISM"
          value={$configStore.electric ? "Electric" : "Manual"}
          length={2}
        />
        <SelectMechanism />
        <CustomizationBlock
          title="Size"
          targetSelectView="SIZE"
          value={sizeDisplayValue}
        />
        <SelectSize />
        <CustomizationBlock
          title="Pressure"
          targetSelectView="PRESSURE"
          value={$configStore.pressure}
          length={3}
        />
        <SelectPressure />
        <CustomizationBlock
          title="Posture"
          targetSelectView="POSTURE"
          value={postureDisplayValue}
          length={8}
        />
        <SelectBackrest />
        <CustomizationBlock
          title="Armrests"
          targetSelectView="ARMRESTS"
          value={$configStore.dropdownArmrest ? "Drop-down" : "Fixed"}
          length={2}
        />
        <SelectArmrests />
        <CustomizationBlock
          title="Accessories"
          targetSelectView="ACCESSORIES"
          value={accessoriesDisplayValue}
          length={4}
        />
        <SelectAccessories />
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
      title="Configura Advance (UK)"
      {config}
      ukStyle={true}
      descriptionFormField={[
        {
          label: "Chair",
          value: chairProductCode ? "Configura Advance" : null,
          code: chairProductCode,
        },
        {
          label: "Mechanism",
          value: $configStore.electric ? "Electric" : "Manual",
          code: mechanismProductCode,
        },
        {
          label: "Size",
          value: sizeDisplayValue,
        },
        {
          label: "Pressure",
          value: $configStore.pressure,
          code: pressureProductCode,
        },
        {
          label: "Backrest",
          value: $configStore.backrest,
          code: backrestProductCode,
        },
        {
          label: "Lateral support",
          value: "None" !== $configStore.lateralSupport ? $configStore.lateralSupport : null,
          code: lateralSupportProductCode,
        },
        {
          label: "Profiled Headrest",
          value: $configStore.profiledHeadrest ? "Profiled Headrest" : null,
          code: profiledHeadrestProductCode,
        },
        {
          label: "Armrests",
          value: $configStore.dropdownArmrest ? "Drop-down" : "Fixed",
          code: armrestsProductCode,
        },
        {
          label: "Accessories",
          value: accessoriesDisplayValue,
          code: accessoriesProductCode,
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
