<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"} {ukStyle}>
  <SelectionGridItem
    active={$configStore.pelvicStrap}
    visible={false}
    title="Pelvic Strap"
    description="A four-point pelvic strap to act as a prompt to aid pelvic positioning."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pelvicStrap: !s.pelvicStrap,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance-uk/accessory--pelvicStrap--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.tray}
    visible={false}
    title="Tray"
    description="Securely attaches to the chair's side piece using poppers to provide a convenient and stable surface for meals or other items."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          tray: !s.tray,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance-uk/accessory--tray--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.environmentalControlInterface}
    visible={false}
    title="Environmental Control Interface"
    description="A control interface that enables the chair to be controlled with third party kits e.g. Possum, Eyegaze."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          environmentalControlInterface: !s.environmentalControlInterface,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance-uk/accessory--environmentalControlInterface--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
