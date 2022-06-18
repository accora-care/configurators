<script lang="ts">
  export let colors: string[];
  export let value: string;

  import SelectionGrid from "../assets/components/SelectionGrid.svelte";
  import SelectionGridItem from "../assets/components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../assets/components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "COLOR"}>
  {#each colors as colorVariant}
    <SelectionGridItem
      active={value === colorVariant}
      onClick={() => {
        configStore.update((s) => {
          return {
            ...s,
            color: colorVariant,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa/colors/${colorVariant}.png`}
        alt={colorVariant}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>

<style lang="scss">
</style>
