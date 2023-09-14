<script lang="ts">
  import { configStore, initVal } from "./configStore";

  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import FormTitle from "../components/FormTitle.svelte";
  import Footer from "../components/Footer.svelte";
  import type { InitConfig } from "../Config.types";
  import SelectBackrest from "./Select/SelectPosture.svelte";
  import SelectPressure from "./Select/SelectPressure.svelte";
  import SelectArmrests from "./Select/SelectArmrests.svelte";
  import SelectMechanism from "./Select/SelectMechanism.svelte";
  import SelectSize from "./Select/SelectSize.svelte";

  export let config: InitConfig;

  let sizeDisplayValue = "";
  let postureDisplayValue = "Waterfall";
  let accessoriesDisplayValue = "none";

  configStore.subscribe((state) => {
    sizeDisplayValue =
      [
        $configStore.width ? `Width ${$configStore.width}"` : null,
        $configStore.depth ? `Depth ${$configStore.depth}"` : null,
        $configStore.height ? `Height ${$configStore.height}"` : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";

    postureDisplayValue =
      [
        $configStore.backrest,
        $configStore.lateralSupport !== "None" ? $configStore.lateralSupport : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";

    accessoriesDisplayValue =
      [
        $configStore.profiledHeadrest ? "Profiled Headrest" : null,
        $configStore.pelvicStrap ? "Pelvic Strap" : null,
        $configStore.tray ? "Tray" : null,
        $configStore.environmentalControlInterface ? "Environmental Control Interface" : null,
      ]
        .filter((item) => !!item)
        .join(", ") || "None";
});
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-configura-advance-uk" class="acc-content">
    <div class="acc-form">
      <FormTitle title={config.mainTitle} />
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
          length={7}
        />
        <SelectBackrest />
        <CustomizationBlock
          title="Armrests"
          targetSelectView="ARMRESTS"
          value={$configStore.dropdownArmrest ? "Dropdown" : "Fixed"}
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
      descriptionFormField={[
        {
          label: "Mechanism",
          value: $configStore.electric ? "Electric" : "Manual",
        },
        {
          label: "Size",
          value: sizeDisplayValue,
        },
        {
          label: "Pressure",
          value: $configStore.pressure,
        },
        {
          label: "Backrest",
          value: $configStore.backrest,
        },
        {
          label: "Lateral support",
          value: "External Lateral Supports" === $configStore.lateralSupport ? "External" : "Lateral Support Wedges" === $configStore.lateralSupport ? "Wedges" : "Not Included",
        },
        {
          label: "Armrests",
          value: $configStore.dropdownArmrest ? "Dropdown" : "Fixed",
        },
        {
          label: "Accessories",
          value:
            [
              $configStore.profiledHeadrest ? "Profiled Headrest" : null,
              $configStore.pelvicStrap ? "Pelvic Strap" : null,
              $configStore.tray ? "Tray" : null,
              $configStore.environmentalControlInterface ? "Environmental Control Interface" : null,
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
