<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";
  import { assistBarLongException } from "./isLongBarAllowed";

  $: headboardImage = `/images/empresa-uk/headboards/${$configStore.variant}_${$configStore.color}.png`;

  $: beddingImage = `/images/base/bedding.png`;

  $: footboardImage = `/images/empresa-uk/footboards/${$configStore.variant}_${$configStore.color}.png`;

  $: sidePanelImage = `/images/empresa-uk/sidePanels/${$configStore.color}_1.png`;

  $: safetyMatImage = `/images/empresa-uk/accessory/safety_mat.png`;

</script>

<PreviewFrame>
  {#if $configStore.liftingPole === "Included"}
    <Img src={`/images/empresa-uk/accessory/Accessory - Lifting Pole - Part 1.png`} alt={`Lifting pole`} />
  {/if}

  <Img src={headboardImage} alt={`${$configStore.variant} headboard`} />

  <Img src={beddingImage} alt={`bedding`} />

  {#if $configStore.assistBar === "Short"}
    <Img src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`} alt={`Assist bar`} />
  {/if}

  {#if $configStore.assistBar === "Long" && !assistBarLongException($configStore)}
    <Img src={`/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`} alt={`Assist bar`} />
  {/if}

  {#if $configStore.liftingPole === "Included"}
    <Img src={`/images/empresa-uk/accessory/Accessory - Lifting Pole - Part 2.png`} alt={`Lifting pole`} />
  {/if}

  {#if $configStore.sidePanel === "With Side Panels" && isSidePanelAllowed($configStore)}
    <Img src={sidePanelImage} alt={`${$configStore.variant} side panel`} />
  {/if}

  {#if $configStore.safetyMat === "Included"}
    <Img src={safetyMatImage} alt={`Safety mat`} />
  {/if}

  <Img src={footboardImage} alt={`${$configStore.variant} footboard`} />
</PreviewFrame>
