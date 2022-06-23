<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
  import { bedVariants } from "../data/bedVariants";

  const variantsByOrder = Object.entries(bedVariants)
    .map(([bedVariant, colors]) => {
      return {
        title: bedVariant,
        colors,
        isQuickship: !!colors.find((item) => item.options?.quickship),
      };
    })
    .sort((variant) => (variant.isQuickship ? -1 : 1));
</script>

<SelectionGrid visible={$configStore.selectorView === "HEADBOARD"}>
  {#each variantsByOrder as { title, isQuickship }}
    <SelectionGridItem
      {isQuickship}
      {title}
      active={$configStore.variant === title}
      onClick={() => {
        configStore.update((s) => {
          return {
            ...s,
            variant: title,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa/headboards_preview/${title}.jpg`}
        alt={title}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>

<style lang="scss">
</style>
