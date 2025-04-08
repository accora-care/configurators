<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";
</script>

<PreviewFrame>
  {#if $configStore.liftingPole === "Included"}
    <Img
      src={`/images/accessory/Accessory - Lifting Pole - Part 1.png`}
      alt={`bedding`}
    />
  {/if}
  <Img src={`/images/base/bedding.png`} alt={`bedding`} />
  <Img
    src={`/images/empresa/headboards/${$configStore.variant}_${$configStore.color}.png`}
    alt={`headboard - ${$configStore.variant} - ${$configStore.color}`}
  />
  {#if $configStore.assistBar === "Short"}
    <Img
      src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`}
      alt={`bedding`}
    />
  {/if}
  {#if $configStore.assistBar === "Long"}
    <Img
      src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`}
      alt={`bedding`}
    />
  {/if}
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
  {#if $configStore.safetyMat === "Included"}
    <Img src={`/images/empresa/accessory/safety_mat.png`} alt={`Safety mat`} />
  {/if}
</PreviewFrame>
