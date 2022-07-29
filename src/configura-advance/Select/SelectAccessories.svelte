<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={true}>
  <SelectionGridItem
    active={$configStore.headrest}
    title="Headrest"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          headrest: !s.headrest,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/headrest.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.lateralSupport}
    title="Lateral support"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lateralSupport: !s.lateralSupport,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/lateral-support.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.backrest === "normal"}
    title="Normal backrest"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "normal",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/normal-head.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.backrest === "postral"}
    title="Postral backrest"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          backrest: "postral",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-advance/postral-backrest.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
