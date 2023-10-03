<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getHeadrestException } from "../isHeadrestAllowed";

  let headrestException = "";
  configStore.subscribe((state) => {
    headrestException = getHeadrestException(state);
  });

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "MECHANISM"} {ukStyle}>
  <!-- BACKREST -->

  <SelectionGridItem
    active={! $configStore.electric}
    title="Manual"
    description="Manually operated functions such as tilt-in-space and backrest angle adjustment."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          electric: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance-uk/mechanism--manual--preview.svg`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.electric}
    title="Electric"
    description="An electric motor is utilised for tilt-in-space and legrest functions."
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          electric: true,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance-uk/mechanism--electric--preview.svg`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
