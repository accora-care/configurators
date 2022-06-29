<script lang="ts">
  import Img from "../components/Img.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";
</script>

<div class="image-frame">
  {#if $configStore.liftingPole === "Included"}
    <Img
      src={`/images/accessory/Accessory - Lifting Pole - Part 1.png`}
      alt={`bedding`}
      class="image-frame-img"
    />
  {/if}
  <Img src={`/images/base/bedding.png`} alt={`bedding`} />
  <Img
    src={`/images/empresa/headboards/${$configStore.variant}_${$configStore.color}.png`}
    alt={`headboard - ${$configStore.variant} - ${$configStore.color}`}
  />
  {#if $configStore.sidePanel === "Included" && isSidePanelAllowed($configStore)}
    <Img
      src={`/images/empresa/sidePanels/${$configStore.color}_1.png`}
      alt={`${$configStore.variant} - ${$configStore.color}`}
    />
  {/if}
  <Img
    src={`/images/empresa/footboards/${$configStore.variant}_${$configStore.color}.png`}
    alt={`footboard - ${$configStore.variant} - ${$configStore.color}`}
  />
  {#if $configStore.liftingPole === "Included"}
    <Img
      src={`/images/accessory/Accessory - Lifting Pole - Part 2.png`}
      alt={`bedding`}
    />
  {/if}
  {#if ["Long", "Short"].includes($configStore.assistBar)}
    <Img
      src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`}
      alt={`bedding`}
    />
  {/if}
  {#if $configStore.safetyMat === "Included"}
    <Img src={`/images/accessory/Accessory - Safety Mat.png`} alt={`bedding`} />
  {/if}
</div>

<style lang="scss" global>
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
