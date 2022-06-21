<script lang="ts">
  import { configStore } from "./configStore";
</script>

<div class="image-frame">
  {#if $configStore.liftingPole === "true"}
    <img
      src={`/images/accessory/Accessory - Lifting Pole - Part 1.png`}
      alt={`bedding`}
    />
  {/if}
  <img src={`/images/base/bedding.png`} alt={`bedding`} />
  <img
    class="image-bed-variant"
    src={`/images/empresa/headboards/${$configStore.variant}_${$configStore.color}.png`}
    alt={`headboard - ${$configStore.variant} - ${$configStore.color}`}
  />
  {#if $configStore.sidePanel === "Included"}
    <img
      src={`/images/empresa/sidePanels/${$configStore.color}_1.png`}
      alt={`${$configStore.variant} - ${$configStore.color}`}
    />
  {/if}
  <img
    src={`/images/empresa/footboards/${$configStore.variant}_${$configStore.color}.png`}
    alt={`footboard - ${$configStore.variant} - ${$configStore.color}`}
  />
  {#if $configStore.liftingPole === "true"}
    <img
      src={`/images/accessory/Accessory - Lifting Pole - Part 2.png`}
      alt={`bedding`}
    />
  {/if}
  {#if ["Long", "Short"].includes($configStore.assistBar)}
    <img
      src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`}
      alt={`bedding`}
    />
  {/if}
  {#if $configStore.safetyMat === "true"}
    <img src={`/images/accessory/Accessory - Safety Mat.png`} alt={`bedding`} />
  {/if}
</div>

<style lang="scss">
  .image-frame {
    /* width: #{16 * 70}px; */
    width: 100%;
    height: 0;
    padding-top: 60%;
    position: relative;
    /* background: rgba(0, 0, 0, 0.1); */
    img {
      height: 100%;
      width: 100%;
      max-height: 640px;
      object-fit: contain;
      position: absolute;
      top: 0;
      /* top: calc((100vh - 100%) / 2); */
      /* left: -20%; */
      transform: translateX(-10%);
    }
  }
</style>
