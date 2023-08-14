<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
  import { bedVariants } from "../data/bedVariants";
  import { sidePanels } from "../data/sidePanels";
  import { isSidePanelAllowed } from "../isSidePanelAllowed";

  $: woodenVariantsByOrder = Object.entries(bedVariants.wooden)
    .map(([bedVariant, colors]) => {
      return {
        title: bedVariant,
        colors,
        isQuickship: !!colors.find((item) => item.options?.quickship),
      };
    })
    .sort((variant) => (variant.isQuickship ? -1 : 1));

  $: fabricVariantsByOrder = Object.entries(bedVariants.fabric)
    .map(([bedVariant, fabrics]) => {
      return {
        title: bedVariant,
        fabrics,
        isQuickship: !!fabrics.find((item) => item.options?.quickship),
      };
    })
    .sort((variant) => (variant.isQuickship ? -1 : 1));
</script>

<SelectionGrid visible={$configStore.selectorView === "HEADBOARD"} title="Wooden Styles">
  {#each woodenVariantsByOrder as { title, isQuickship }}
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

<SelectionGrid visible={$configStore.selectorView === "HEADBOARD"} title="Fabric Styles">
  {#each fabricVariantsByOrder as { title, isQuickship }}
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
        src={`/images/empresa-uk/headboards_preview/fabric/${title}.png`}
        alt={title}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>

<style lang="scss">
</style>
