<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore } from "./configStore";
  import Select from "./Select/Select.svelte";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import IconHeadboard from "./assets/icon-headboard.svg";
  import IconColor from "./assets/icon-color.svg";
  import IconSafety from "./assets/icon-safety.svg";
  import IconSidepanels from "./assets/icon-sidepanels.svg";
  import IconAccessory from "./assets/icon-accessory.svg";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAssisBar from "./Select/SelectAssistBar.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import SelectSide from "./Select/SelectSide.svelte";

  const availableColors = bedVariants[$configStore.variant].map(
    (item) => item.title
  );
</script>

<main>
  <!-- <label for="side_panel">Side panel</label>
  <select name="side_panel" bind:value={$configStore.sidePanel}>
    {#each sidePanels as sidePanel, i}
      <option value={sidePanel.title}>
        {sidePanel.title}
      </option>
    {/each}
  </select> -->
  <div class="customization-container">
    <div class="image-frame-container">
      <Preview />
    </div>
    <div class="customization-form">
      <div class="form-title">Customize your Accora Floor Bed</div>
      <div class="customization-form-content">
        <div class="select-container">
          <div class="iconContainer">
            <IconHeadboard />
          </div>
          <Select
            title="Headboard"
            bind:value={$configStore.variant}
            options={Object.keys(bedVariants).map((item) => ({ title: item }))}
          />
        </div>
        <!-- 
        {#if bedVariants[$configStore.variant]}
          <div class="select-container">
            <div class="iconContainer">
              <IconColor />
            </div>
            <Select
              title="Color"
              bind:value={$configStore.color}
              options={bedVariants[$configStore.variant]}
            />
          </div>
        {/if} -->

        <CustomizationBlock
          title="Color"
          targetSelectView="COLOR"
          value={$configStore.color}
          length={availableColors.length}
        >
          <IconColor />
        </CustomizationBlock>
        <SelectPreviewColor
          colors={availableColors}
          bind:value={$configStore.color}
        />

        <CustomizationBlock
          title="Side Panels"
          targetSelectView="SIDE_PANEL"
          value={$configStore.sidePanel}
          length={2}
        >
          <IconSidepanels />
        </CustomizationBlock>
        <SelectSide />

        <!-- <div class="radios-wrapper">
          <div class="radios">
            <Radio
              name="sidePanel"
              label="Include"
              value="Included"
              bind:group={$configStore.sidePanel}
            />
            <Radio
              name="sidePanel"
              label="Don't include"
              bind:group={$configStore.sidePanel}
              value="Excluded"
            />
          </div>
        </div> -->
        <CustomizationBlock
          title="Assist Bar"
          targetSelectView="ASSIST_BAR"
          value={$configStore.assistBar}
          length={2}
        >
          <IconSafety />
        </CustomizationBlock>
        <SelectAssisBar bind:value={$configStore.assistBar} />

        <CustomizationBlock
          title="Accessories"
          targetSelectView="ACCESSORIES"
          value={$configStore.assistBar}
          length={2}
        >
          <IconAccessory />
        </CustomizationBlock>
        <SelectAccessories />
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    max-width: 240px;
    margin: 0 auto;
    font-family: "Poppins";
    box-sizing: border-box;
    * {
      box-sizing: border-box;
    }
    --primary: rgba(25, 162, 144, 1);
    --border-color: rgba(234, 234, 234, 1);
  }
  .customization-container {
    display: flex;
  }

  .customization-form {
    width: 550px;
    flex-shrink: 0;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.07);
  }
  .customization-form-content {
    padding: 24px;
  }

  .radios-wrapper {
    border-top: 1px solid rgba(235, 236, 239, 1);
    padding-top: 1rem;
    margin-top: 1rem;
  }
  .radios {
    display: flex;
    padding-bottom: 0.5rem;
  }

  .radios-title {
    font-size: 16px;
    font-weight: 500;
    padding-left: 1rem;
    padding-bottom: 1rem;
  }

  .form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 5px 5px 0 0;
    color: white;
    font-size: 18px;
    font-weight: 400;
  }

  .select-container {
    display: flex;
    align-items: center;
    padding-right: 1rem;
    & + & {
      border-top: 1px solid rgba(235, 236, 239, 1);
      padding-top: 1rem;
      margin-top: 1rem;
    }
    .iconContainer {
      padding: 16px;
      flex-shrink: 0;
    }
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .image-frame-container {
    flex-grow: 1;
    max-width: 100vh;
    margin-right: 10%;
  }
</style>
