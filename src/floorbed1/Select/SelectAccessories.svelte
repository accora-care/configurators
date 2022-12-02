<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={true}>
  <SelectionGridItem
    active={$configStore.lever}
    title="Assist bar"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lever: !s.lever,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1/lever_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.liftingPole}
    title="Self-assist pole"
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
      src={`/images/floorbed1/liftingPole_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.bumpers}
    title="Head and foot bumpers"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          bumpers: !s.bumpers,
          pumpHolder: !s.bumpers ? false : s.pumpHolder,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1/bumpers_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.pumpHolder}
    title="Pump holder"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pumpHolder: !s.pumpHolder,
          bumpers: !s.pumpHolder ? false : s.bumpers,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1/pumpHolder_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.safetyMat}
    title="High safety mat"
    onClick={() => {
      configStore.update((s) => {
        const nextState = !s.safetyMat;
        return {
          ...s,
          safetyMat: nextState,
          // lever: nextState ? false : s.lever,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1/safetyMat_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.sideRails}
    title="Side rails"
    onClick={() => {
      configStore.update((s) => {
        const nextState = !s.sideRails;
        return {
          ...s,
          sideRails: nextState,
          // lever: nextState ? false : s.lever,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1/sideRails_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
