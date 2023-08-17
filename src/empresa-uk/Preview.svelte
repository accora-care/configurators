<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";
  import { assistBarLongException } from "./isLongBarAllowed";

  import { bedVariants } from "./data/bedVariants";

  const fabricBedVariants = Object.keys(bedVariants.fabric);

  $: isFabricBedVariant = fabricBedVariants.includes($configStore.variant);

  $: liftingPolePart1Image = isFabricBedVariant
    ? `/images/empresa-uk/accessory/fabric/Accessory - Lifting Pole - Part 1.png`
    : `/images/empresa-uk/accessory/Accessory - Lifting Pole - Part 1.png`;

  $: liftingPolePart2Image = isFabricBedVariant
    ? `/images/empresa-uk/accessory/fabric/Accessory - Lifting Pole - Part 2.png`
    : `/images/empresa-uk/accessory/Accessory - Lifting Pole - Part 2.png`;

  $: headboardImage = isFabricBedVariant
    ? `/images/empresa-uk/headboards/fabric/${$configStore.variant}_${$configStore.fabric}.png`
    : `/images/empresa-uk/headboards/${$configStore.variant}_${$configStore.color}.png`;

  $: beddingImage = isFabricBedVariant
    ? `/images/base/fabric/bedding.png`
    : `/images/base/bedding.png`;

  $: proTectSideRailImage = isFabricBedVariant
    ? `/images/empresa-uk/accessory/fabric/Accessory - Protect Rails.png`
    : `/images/empresa-uk/accessory/Accessory - Protect Rails.png`;

  $: assistBarImage = isFabricBedVariant
    ? `/images/empresa-uk/accessory/fabric/Accessory - Assist Bar ${$configStore.assistBar}.png`
    : `/images/accessory/Accessory - Assist Bar ${$configStore.assistBar}.png`;

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

  $: safetyMatImage = isFabricBedVariant
    ? `/images/empresa-uk/accessory/fabric/safety_mat.png`
    : `/images/empresa-uk/accessory/safety_mat.png`;

</script>

<PreviewFrame>
  {#if $configStore.liftingPole === "Included"}
    <Img src={liftingPolePart1Image} alt={`Lifting pole`} />
  {/if}

  <Img src={headboardImage} alt={`${$configStore.variant} headboard`} />

  <Img src={beddingImage} alt={`bedding`} />

  {#if $configStore.proTectSideRail === "Included"}
    <Img src={proTectSideRailImage} alt={`ProTect side rail`} />
  {/if}

  {#if $configStore.assistBar === "Short"}
    <Img src={assistBarImage} alt={`Assist bar`} />
  {/if}

  {#if $configStore.assistBar === "Long" && !assistBarLongException($configStore)}
    <Img src={assistBarImage} alt={`Assist bar`} />
  {/if}

  {#if $configStore.liftingPole === "Included"}
    <Img src={liftingPolePart2Image} alt={`Lifting pole`} />
  {/if}

  {#if $configStore.sidePanel === "Included" && isSidePanelAllowed($configStore)}
    <Img src={sidePanelImage} alt={`${$configStore.variant} side panel`} />
  {/if}

  {#if $configStore.safetyMat === "Included"}
    <Img src={safetyMatImage} alt={`Safety mat`} />
  {/if}

  <Img src={footboardImage} alt={`${$configStore.variant} footboard`} />
</PreviewFrame>
