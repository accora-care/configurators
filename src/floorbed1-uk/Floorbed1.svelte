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

  export let config: InitConfig;
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-floorbed1-uk" class="acc-content">
    <div class="acc-form">
      <FormTitle title={config.mainTitle} />
      <div class="acc-form-content">
        <CustomizationBlock
          title="Side Rails"
          targetSelectView="SIDE_RAILS"
          length={2}
        />
        <SelectSideRails />
        <CustomizationBlock
          title="Safety"
          targetSelectView="SAFETY"
          length={5}
        />
        <SelectSafety />
        <CustomizationBlock
          title="Mobility"
          targetSelectView="MOBILITY"
          length={3}
        />
        <SelectMobility />
        <CustomizationBlock
          title="Extras"
          targetSelectView="EXTRAS"
          length={5}
        />
        <SelectExtras />
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
      title="Floorbed 1"
      {config}
      descriptionFormField={[
        {
          label: "Side rails",
          value: "None" !== $configStore.sideRails ? $configStore.sideRails + " ✓" : "Not included",
        },
        {
          label: "Head and foot bumbers",
          value: $configStore.bumpers ? "Included ✓" : "Not included",
        },
        {
          label: "Safety mat",
          value: "None" !== $configStore.safetyMat ? $configStore.safetyMat + " ✓" : "Not included",
        },
        {
          label: "Safety sleeve",
          value: $configStore.safetySleeve ? "Included ✓" : "Not included",
        },
        {
          label: "Junior kit",
          value: $configStore.juniorKit ? "Included ✓" : "Not included",
        },
        {
          label: "Bed lever",
          value: "None" !== $configStore.lever ? $configStore.lever + " ✓" : "Not included",
        },
        {
          label: "Lifting pole",
          value: $configStore.liftingPole ? "Included ✓" : "Not included",
        },
        {
          label: "Pump holder",
          value: $configStore.pumpHolder ? "Included ✓" : "Not included",
        },
        {
          label: "Mattress infill",
          value: $configStore.mattressInfill ? "Included ✓" : "Not included",
        },
        {
          label: "Bed extension",
          value: $configStore.bedExtension ? "Included ✓" : "Not included",
        },
        {
          label: "Mattress extension foam",
          value: $configStore.mattressExtensionFoam ? "Included ✓" : "Not included",
        },
        {
          label: "Bed extension kit",
          value: $configStore.bedExtensionKit ? "Included ✓" : "Not included",
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
