<script lang="ts">
  export let colors: { title: string; options: { quickship?: boolean } }[];

  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
  import { bedVariants } from "../data/bedVariants";
  import { colorsOrder } from "../data/colors";

  $: sortedColors = colors.sort((a, b) => {
    const indexA = colorsOrder.findIndex((color) => color === a.title) ?? 10000;
    const indexB = colorsOrder.findIndex((color) => color === b.title) ?? 10000;
    return indexA - indexB;
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "COLOR" || true}>
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
        alt={colorVariant.title}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>
