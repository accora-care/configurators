<script lang="ts">
  import { configStore, initVal } from "./configStore";

  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import type { InitConfig } from "./Config.types";
  import ConfiguratorContainer from "../components/ConfiguratorContainer.svelte";
  import PreviewContainer from "../components/PreviewContainer.svelte";
  import FormTitle from "../components/FormTitle.svelte";
  import Footer from "../components/Footer.svelte";

  export let config: InitConfig;
</script>

<ConfiguratorContainer>
  <PreviewContainer>
    <Preview />
  </PreviewContainer>

  <div id="acc-configura-advance" class="acc-content">
    <div class="acc-form">
      <FormTitle title={config.mainTitle} />
      <div class="acc-form-content">
        <CustomizationBlock title="Options & accessories" length={6} />
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
      title="Configura Advance"
      {config}
      descriptionFormField={[
        {
          label: "Backrest",
          value: $configStore.backrest === "normal" ? "Waterfall" : "Postural",
        },
        {
          label: "Armrests",
          value: $configStore.dropdownArmrest ? "Dropdown" : "Fixed",
        },
        {
          label: "Headrest",
          value: $configStore.headrest ? "Included ✓" : "Not included",
        },
        {
          label: "Lateral support",
          value: $configStore.lateralSupport ? "Included ✓" : "Not included",
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
</style>
