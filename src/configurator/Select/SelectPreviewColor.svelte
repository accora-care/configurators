<script lang="ts">
  export let colors: { title: string; options: { quickship?: boolean } }[];

  import SelectionGrid from "../components/SelectionGrid.svelte";
  import SelectionGridItem from "../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";

  const sortedColors = colors.sort((a) => (a.options?.quickship ? -1 : 1));
</script>

<SelectionGrid visible={$configStore.selectorView === "COLOR"}>
  {#each sortedColors as colorVariant}
    <SelectionGridItem
      isQuickship={colorVariant.options.quickship}
      title={colorVariant.title}
      active={$configStore.color === colorVariant.title}
      onClick={() => {
        configStore.update((s) => {
          return {
            ...s,
            color: colorVariant.title,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa/colors/${colorVariant.title}.png`}
        alt={colorVariant}
        cls="cls"
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>

<style lang="scss">
  .cls {
    height: 30%;
  }
</style>
