<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={true}>
  <SelectionGridItem
    active={$configStore.backrest === "normal"}
    title="Waterfall backrest"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "normal",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/backrest--standard--preview.jpg`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.backrest === "postural"}
    title="Postural backrest"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "postural",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/backrest--postural--preview.jpg`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
