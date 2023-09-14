<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { BACKREST_OPTIONS, configStore } from "./configStore";

  const getBackrestImage = (backrest: BACKREST_OPTIONS) => {
    switch (backrest) {
      case "Adjustable Lateral Support":
        return `/images/configura-comfort-uk/posture-backrest--adjustableLateralSupport.png`;
      case "Lateral Support Backrest":
        return `/images/configura-comfort-uk/posture-backrest--lateralSupportBackrest.png`;
      case "Cocoon":
        return `/images/configura-comfort-uk/posture-backrest--cocoon.png`;
      case "Waterfall":
        return ! $configStore.profiledHeadrest ? `/images/configura-comfort-uk/posture-backrest--waterfall-top.png` : '';
    }

    return '';
  };
</script>

<PreviewFrame>
  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-comfort-uk${$configStore.vinyl ? '/vinyl' : ''}/armrest_left--dropdown.png`
      : `/images/configura-comfort-uk${$configStore.vinyl ? '/vinyl' : ''}/armrest_left--fixed.png`}
  />

  <Img src={`/images/configura-comfort-uk${$configStore.vinyl ? '/vinyl' : ''}/base.png`} />
  <Img src={`/images/configura-comfort-uk/seat.png`} />

  {#if "Waterfall" === $configStore.backrest}
    <Img src={`/images/configura-comfort-uk/posture-backrest--waterfall-bot.png`} />
    <Img src={`/images/configura-comfort-uk/posture-backrest--waterfall-mid.png`} />
  {/if}

  <Img src={getBackrestImage($configStore.backrest)} />

  {#if "Lateral Support Backrest" === $configStore.backrest || "Adjustable Lateral Support" === $configStore.backrest}
    <Img src={`/images/configura-comfort-uk/posture-backrest--waterfall-top.png`} />
  {/if}

  {#if $configStore.profiledHeadrest}
    <Img src={`/images/configura-comfort-uk/accessory--profiledHeadrest.png`} />
  {/if}

  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-comfort-uk${$configStore.vinyl ? '/vinyl' : ''}/armrest_right--dropdown.png`
      : `/images/configura-comfort-uk${$configStore.vinyl ? '/vinyl' : ''}/armrest_right--fixed.png`}
  />
</PreviewFrame>
