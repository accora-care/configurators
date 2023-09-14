<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getBackrestException } from "../isOptionAllowed";

  let backrestException = "";

  configStore.subscribe((state) => {
    backrestException = getBackrestException(state);
  });

  const ukStyle = false;
</script>

<SelectionGrid visible={$configStore.selectorView === "POSTURE"} title="Backrests" ukStyle={ukStyle}>
  <!-- BACKREST -->

  <SelectionGridItem
    active={$configStore.backrest === "Waterfall"}
    title="Waterfall"
    ukStyle={ukStyle}
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
      src={`/images/configura-comfort-uk/posture-backrest--waterfall--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={backrestException}
    active={$configStore.backrest === "Cocoon"}
    disabled={null !== backrestException}
    title="Cocoon"
    ukStyle={ukStyle}
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
    notAllowedMessage={backrestException}
    active={$configStore.backrest === "Lateral Support Backrest"}
    title="Lateral Support Backrest"
    disabled={null !== backrestException}
    ukStyle={ukStyle}
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
    notAllowedMessage={backrestException}
    active={$configStore.backrest === "Adjustable Lateral Support"}
    title="Adjustable Lateral Support"
    disabled={null !== backrestException}
    ukStyle={ukStyle}
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

<SelectionGrid visible={$configStore.selectorView === "POSTURE"} title="Other" ukStyle={ukStyle}>
  <!-- OTHER -->

  <SelectionGridItem
  active={"Lateral Support Wedges" === $configStore.lateralSupport}
  visible={false}
    title="Lateral Support Wedges "
    ukStyle={ukStyle}
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
</SelectionGrid>
