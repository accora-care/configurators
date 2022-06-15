<script lang="ts">
  export let name: string;
  import { bedVariants } from "./data/bedVariants";
  import { configStore } from "./configStore";
  import { sidePanels } from "./data/sidePanels";
  import Select from "./Select/Select.svelte";
  import IconHeadboard from "./assets/icon-headboard.svg";
  import IconColor from "./assets/icon-color.svg";
  import IconAddons from "./assets/icon-addons.svg";
  import Radio from "./Select/Radio.svelte";
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
      <div class="image-frame">
        {#if $configStore.liftingPole === "true"}
          <img
            class="image-bed-variant"
            src={`/images/accessory/Accessory - Lifting Pole - Part 1.png`}
            alt={`bedding`}
          />
        {/if}
        <img
          class="image-bed-variant"
          src={`/images/base/bedding.png`}
          alt={`bedding`}
        />
        <img
          class="image-bed-variant"
          src={`/images/empresa/headboards/${$configStore.variant}_${$configStore.color}.png`}
          alt={`headboard - ${$configStore.variant} - ${$configStore.color}`}
        />
        <img
          class="image-bed-variant"
          src={`/images/empresa/sidePanels/${$configStore.color}_1.png`}
          alt={`${$configStore.variant} - ${$configStore.color}`}
        />
        <img
          class="image-bed-variant"
          src={`/images/empresa/footboards/${$configStore.variant}_${$configStore.color}.png`}
          alt={`footboard - ${$configStore.variant} - ${$configStore.color}`}
        />
        {#if $configStore.liftingPole === "true"}
          <img
            class="image-bed-variant"
            src={`/images/accessory/Accessory - Lifting Pole - Part 2.png`}
            alt={`bedding`}
          />
        {/if}
        {#if ["Long", "Short"].includes($configStore.assistBar)}
          <img
            class="image-bed-variant"
            src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`}
            alt={`bedding`}
          />
        {/if}
        {#if $configStore.safetyMat === "true"}
          <img
            class="image-bed-variant"
            src={`/images/accessory/Accessory - Safety Mat.png`}
            alt={`bedding`}
          />
        {/if}
      </div>
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
        {/if}
        <div class="radios-wrapper">
          <div class="radios-title">Assist Bar</div>
          <div class="radios">
            <Radio
              name="assist_bar"
              label="Short"
              value="Short"
              bind:group={$configStore.assistBar}
            />
            <Radio
              name="assist_bar"
              label="Long"
              bind:group={$configStore.assistBar}
              value="Long"
            />
            <Radio
              name="assist_bar"
              label="None"
              bind:group={$configStore.assistBar}
              value="None"
            />
          </div>
        </div>
        <div class="radios-wrapper">
          <div class="radios-title">Lifting Pole</div>
          <div class="radios">
            <Radio
              name="liftingPole"
              label="Include"
              value="true"
              bind:group={$configStore.liftingPole}
            />
            <Radio
              name="liftingPole"
              label="Don't include"
              bind:group={$configStore.liftingPole}
              value="false"
            />
          </div>
        </div>
        <div class="radios-wrapper">
          <div class="radios-title">Safety mat</div>
          <div class="radios">
            <Radio
              name="safetyMat"
              label="Include"
              value="true"
              bind:group={$configStore.safetyMat}
            />
            <Radio
              name="safetyMat"
              label="Don't include"
              bind:group={$configStore.safetyMat}
              value="false"
            />
          </div>
        </div>
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
  .image-frame {
    /* width: #{16 * 70}px; */
    width: 100%;
    height: 0;
    padding-top: 80%;
    position: relative;
    /* background: rgba(0, 0, 0, 0.1); */
    overflow: none;
    img {
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: -100%;
      transform: translateX(50%);
    }
  }
</style>
