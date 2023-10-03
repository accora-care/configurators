<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getLateralSupportBackrestsException, getLateralSupportWedgesException } from "../isOptionAllowed";

  let lateralSupportBackrestsException = "";
  let lateralSupportWedgesException = "";

  configStore.subscribe((state) => {
    lateralSupportBackrestsException = getLateralSupportBackrestsException(state);
    lateralSupportWedgesException = getLateralSupportWedgesException(state);
  });

  const ukStyle = false;
</script>

<SelectionGrid visible={$configStore.selectorView === "POSTURE"} title="Backrests" {ukStyle}>
  <!-- BACKREST -->

  <SelectionGridItem
    active={$configStore.backrest === "Waterfall"}
    title="Waterfall"
    standard={true}
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "Waterfall",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/posture-backrest--waterfall--${$configStore.vinyl ? 'vinyl' : 'duratec'}--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.backrest === "Cocoon"}
    title="Cocoon"
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "Cocoon",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/posture-backrest--cocoon--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={lateralSupportBackrestsException}
    active={$configStore.backrest === "Lateral Support Backrest"}
    title="Lateral Support Backrest"
    disabled={null !== lateralSupportBackrestsException}
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "Lateral Support Backrest",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/posture-backrest--lateralSupportBackrest--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={lateralSupportBackrestsException}
    active={$configStore.backrest === "Adjustable Lateral Support"}
    title="Adjustable Lateral Support"
    disabled={null !== lateralSupportBackrestsException}
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "Adjustable Lateral Support",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/posture-backrest--adjustableLateralSupport--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>

<SelectionGrid visible={$configStore.selectorView === "POSTURE"} title="Other" {ukStyle}>
  <!-- OTHER -->

  <SelectionGridItem
    notAllowedMessage={lateralSupportWedgesException}
    active={"Lateral Support Wedges" === $configStore.lateralSupport}
    visible={false}
    title="Lateral Support Wedges "
    disabled={null !== lateralSupportWedgesException}
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lateralSupport: "Lateral Support Wedges" !== s.lateralSupport ? "Lateral Support Wedges" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/posture-other--lateralSupportWedges--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>

  <SelectionGridItem
    active={$configStore.profiledHeadrest}
    visible={"Cocoon" !== $configStore.backrest}
    title="Profiled Headrest"
    description="The profiled headrest offers increased head and neck support."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          profiledHeadrest: !s.profiledHeadrest,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/accessory--profiledHeadrest--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
