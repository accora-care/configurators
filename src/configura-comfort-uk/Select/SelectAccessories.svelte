<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getHeadrestException } from "../isOptionAllowed";

  let headrestException = "";

  configStore.subscribe((state) => {
    headrestException = getHeadrestException(state);
  });

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"} ukStyle={ukStyle}>
  <SelectionGridItem
  notAllowedMessage={headrestException}
  active={$configStore.profiledHeadrest}
    title="Profiled Headrest"
    disabled={null !== headrestException}
    description="The profiled headrest offers increased head and neck support."
    ukStyle={ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          profiledHeadrest: !s.profiledHeadrest,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/accessory--profiledHeadrest--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
