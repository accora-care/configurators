<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  export let value: string;

  import { configStore } from "../configStore";
  import { assistBarLongException } from "../isLongBarAllowed";

  let assistBarException = "";

  configStore.subscribe((state) => {
    assistBarException = assistBarLongException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "ASSIST_BAR"}>
  <SelectionGridItem
    active={value === "Long"}
    title={"Long"}
    disabled={!!assistBarException}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "Long",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"Long"} - preview.jpg`}
      alt={"Long assist bar"}
    />
    {#if !!assistBarException}
      <span class="acc-exception">{assistBarException}</span>
    {/if}
  </SelectionGridItem>
  <SelectionGridItem
    active={value === "Short"}
    title={"Short"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "Short",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"Short"} - preview.jpg`}
      alt={"Short assist bar"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={value === "None"}
    title={"None"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"None"} - preview.jpg`}
      alt={"None "}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss" global>
  .acc-exception {
    font-size: 1rem;
  }
</style>
