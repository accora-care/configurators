<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";

  const ukStyle = false;
</script>

<SelectionGrid visible={$configStore.selectorView === "FABRIC"} {ukStyle}>
  <!-- BACKREST -->

  <SelectionGridItem
    active={! $configStore.vinyl}
    title="Duratek"
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          vinyl: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/fabric--duratek--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.vinyl}
    title="Vinyl"
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          vinyl: true,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/fabric--vinyl--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
