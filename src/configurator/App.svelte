<script lang="ts">
  import { bedVariants } from "./data/bedVariants";
  import { configStore, initVal } from "./configStore";
  import Select from "./Select/Select.svelte";
  import SelectPreviewColor from "./Select/SelectPreviewColor.svelte";
  import IconHeadboard from "./assets/icon-headboard.svg";
  import CustomizationBlock from "./CustomizationBlock.svelte";
  import Preview from "./Preview.svelte";
  import SelectAssisBar from "./Select/SelectAssistBar.svelte";
  import SelectAccessories from "./Select/SelectAccessories.svelte";
  import SelectSide from "./Select/SelectSide.svelte";

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
      <div class="form-title">Customize your Accora Floor Bed</div>
      <div class="customization-form-content">
        <div class="select-container">
          <div class="iconContainer">
            <IconHeadboard />
          </div>
          <Select
            title="Headboard"
            bind:value={$configStore.variant}
            options={Object.keys(bedVariants).map((item) => ({
              title: item,
            }))}
          />
        </div>
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
        <button id="booking-button">Book a demo</button>
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
    border-top: 1px solid var(--border-color);
    cursor: pointer;
    &:hover {
      color: var(--primary);
    }
  }
</style>
