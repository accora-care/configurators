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
  import type { InitConfig } from "../Config.types";

  export let config: InitConfig;

  const availableColors = bedVariants[$configStore.variant];
</script>

<div id="empresa-configurator">
  <div class="image-frame-container">
    <div class="sticky">
      <Preview />
    </div>
  </div>
  <div class="content-container">
    <div class="customization-form">
      <div class="form-title">{config.mainTitle}</div>
      <div class="customization-form-content">
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
          value={$configStore.sidePanel}
          length={2}
        />
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
        />
        <SelectAssisBar bind:value={$configStore.assistBar} />

        <CustomizationBlock
          title="Accessories"
          targetSelectView="ACCESSORIES"
          value={$configStore.assistBar}
          length={2}
        />
        <SelectAccessories />
        <div
          class="reset"
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
    <div class="submit-container">
      <div class="submit-container-content">
        <a
          id="booking-button"
          href={`mailto:${
            config.demoEmailAddress
          }?subject=Requesting a bed demo&body=${encodeURIComponent(
            `Your name:
Your message here:


____________________________________________

My configuration:
Headboard: ${$configStore.variant}
Color: ${$configStore.color}
Sidepanel: ${$configStore.sidePanel}
Assist Bar: ${$configStore.assistBar}
Lifting pole: ${$configStore.liftingPole}
Safety Mat: ${$configStore.safetyMat}
____________________________________________

`
          )}`}>Book a demo</a
        >
        <p class="booking-info">
          Quick delivery | 100-night risk-free trial | Training &
          implementation.
        </p>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #empresa-configurator {
    font-family: "Poppins";
    box-sizing: border-box;
    position: relative;
    * {
      box-sizing: border-box;
    }
    --primary: rgba(25, 162, 144, 1);
    --border-color: rgba(234, 234, 234, 1);
    --radius: 5px;
    --box-shadow-block: 0 0 40px 0 rgba(0, 0, 0, 0.07);
    p {
      margin-bottom: 0;
    }
    display: flex;
    @media screen and (max-width: 860px) {
      flex-direction: column;
    }
  }

  .content-container {
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

  .customization-form {
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    & > *:last-child {
      border-bottom: none;
    }
  }
  .customization-form-content {
    padding: 1.5rem;
    padding-bottom: 0.25rem;
    border-radius: 0 0 var(--radius) var(--radius);
  }

  .form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 1rem 2rem;
    text-align: center;
    border-radius: var(--radius) var(--radius) 0 0;
    color: white;
    font-size: 18px;
    line-height: 1.5rem;
    font-weight: 400;
    @media screen and (max-width: 860px) {
      display: none;
    }
  }

  .image-frame-container {
    flex-grow: 2;
    flex-shrink: 1;
  }
  .sticky {
    position: sticky;
    /* top: 0; */

    top: 15vh;
    margin: 0 auto;
  }

  #booking-button {
    background: var(--primary);
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    color: white;
    border-radius: 4px;
  }
  .booking-info {
    font-weight: 300;
    text-align: center;
    font-size: 0.875rem;
  }

  .submit-container {
    margin-top: 1rem;
    background: white;
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .submit-container-content {
    padding: 1.5rem;
  }

  .reset {
    text-align: center;
    font-size: 0.75rem;
    padding: 1rem;

    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }
</style>
