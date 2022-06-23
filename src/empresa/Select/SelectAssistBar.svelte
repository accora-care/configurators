<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  export let value: string;

  import { configStore, StoreValues } from "../configStore";
  const bars: StoreValues["assistBar"][] = ["Long", "Short", "None"];
</script>

<SelectionGrid visible={$configStore.selectorView === "ASSIST_BAR"}>
  {#each bars as bar}
    <SelectionGridItem
      active={value === bar}
      title={`${bar}`}
      onClick={() => {
        configStore.update((s) => {
          return {
            ...s,
            assistBar: bar,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa/accessory/${bar} - preview.jpg`}
        alt={bar}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>

<style lang="scss">
</style>
