<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
  import { bedVariants } from "../data/bedVariants";
  import { headboardLabels } from "../data/headboardLabels";

  $: woodenVariantsByOrder = Object.entries(bedVariants.wooden)
    .map(([bedVariant, colors]) => {
      return {
        title: bedVariant,
        colors,
        isQuickship: !!colors.find((item) => item.options?.quickship),
      };
    })
    .sort((variant) => (variant.isQuickship ? -1 : 1));
</script>

<SelectionGrid visible={$configStore.selectorView === "HEADBOARD"} title="Modèles en bois">
  {#each woodenVariantsByOrder as { title, isQuickship }}
    <SelectionGridItem
      {isQuickship}
      title={headboardLabels[title] || title}
      active={$configStore.variant === title}
      onClick={() => {
        const woodenFinishesForVariant = woodenVariantsByOrder.filter(variant => title === variant.title)[0].colors;

        configStore.update((s) => {
          return {
            ...s,
            variant: title,
            color: woodenFinishesForVariant.filter(variant => s.color === variant.title).length > 0 ? s.color : woodenFinishesForVariant[0].title,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa-uk/headboards_preview/${title}.png`}
        alt={title}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>


<style lang="scss">
</style>
