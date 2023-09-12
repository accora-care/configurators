<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getMobilityOptionsException } from "../isOptionAllowed";

  let mobilityOptionsException = "";

  configStore.subscribe((state) => {
    mobilityOptionsException = getMobilityOptionsException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "MOBILITY"} ukStyle={true}>
  <SelectionGridItem
    notAllowedMessage={mobilityOptionsException}
    active={"Standard" === $configStore.lever}
    title="Bed Lever"
    description="The bed lever securely fixes to either side of the bed frame providing support for bed mobility and transfers."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lever: "Standard" !== s.lever ? "Standard" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/lever_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={mobilityOptionsException}
    active={"Short" === $configStore.lever}
    title="Short Bed Lever"
    description="The bed lever securely fixes to either side of the bed frame providing support for bed mobility and transfers."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lever: "Short" !== s.lever ? "Short" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/shortLever_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={mobilityOptionsException}
    active={$configStore.pumpHolder}
    title="Lifting Pole"
    description="The bed lever securely fixes to either side of the bed frame providing support for bed mobility and transfers."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          liftingPole: !s.liftingPole,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/liftingPole_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
