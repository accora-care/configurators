<script lang="ts">
  export let fabrics: { title: string; options: { quickship?: boolean } }[];

  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
  import { configStore } from "../configStore";
  import { fabricsOrder } from "../data/fabrics";

  $: sortedFabrics = fabrics.sort((a, b) => {
    const indexA = fabricsOrder.findIndex((fabric) => fabric === a.title) ?? 10000;
    const indexB = fabricsOrder.findIndex((fabric) => fabric === b.title) ?? 10000;
    return indexA - indexB;
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "FABRIC"}>
  {#each sortedFabrics as fabricVariant}
    <SelectionGridItem
      isQuickship={fabricVariant.options.quickship}
      title={fabricVariant.title}
      active={$configStore.fabric === fabricVariant.title}
      onClick={() => {
        configStore.update((s) => {
          return {
            ...s,
            fabric: fabricVariant.title,
          };
        });
      }}
    >
      <SelectionGridItemImage
        src={`/images/empresa-uk/fabrics/Grosvenor_${fabricVariant.title}.png`}
        alt={fabricVariant.title}
      />
    </SelectionGridItem>
  {/each}
</SelectionGrid>
