<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";

  import { bedVariants } from "./data/bedVariants";

  const fabricBedVariants = Object.keys(bedVariants.fabric);

  $: isFabricBedVariant = fabricBedVariants.includes($configStore.variant);

  $: headboardImage = isFabricBedVariant
    ? `/images/empresa-uk/headboards/fabric/${$configStore.variant}_${$configStore.fabric}.png`
    : `/images/empresa-uk/headboards/${$configStore.variant}_${$configStore.color}.png`;

  $: beddingImage = isFabricBedVariant
    ? `/images/base/fabric/bedding.png`
    : `/images/base/bedding.png`;

  $: footboardImage = isFabricBedVariant
    ? 'Alexander with Wood' === $configStore.variant
      ? `/images/empresa-uk/footboards/fabric/${$configStore.variant}.png`
      : `/images/empresa-uk/footboards/fabric/${$configStore.variant}_${$configStore.fabric}.png`
    : `/images/empresa-uk/footboards/${$configStore.variant}_${$configStore.color}.png`;

  $: sidePanelImage = isFabricBedVariant
    ? 'Alexander with Wood' === $configStore.variant
      ? `/images/empresa-uk/sidePanels/fabric/Wood_1.png`
      : `/images/empresa-uk/sidePanels/fabric/${$configStore.fabric}_1.png`
    : `/images/empresa-uk/sidePanels/${$configStore.color}_1.png`;

</script>

<PreviewFrame>
  <Img src={headboardImage} alt={`${$configStore.variant} headboard`} />

  <Img src={beddingImage} alt={`bedding`} />

  {#if $configStore.sidePanel === "With Side Panels" && isSidePanelAllowed($configStore)}
    <Img src={sidePanelImage} alt={`${$configStore.variant} side panel`} />
  {/if}

  <Img src={footboardImage} alt={`${$configStore.variant} footboard`} />
</PreviewFrame>
