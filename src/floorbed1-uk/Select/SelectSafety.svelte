<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getBumpersException, getSafetySleeveException, getJuniorKitException } from "../isOptionAllowed";

  let juniorKitException = "";
  let bumpersException = "";
  let safetySleeveException = "";

  configStore.subscribe((state) => {
    juniorKitException = getJuniorKitException(state);
    bumpersException = getBumpersException(state);
    safetySleeveException = getSafetySleeveException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "SAFETY"} ukStyle={true}>
  <SelectionGridItem
    notAllowedMessage={bumpersException}
    active={$configStore.bumpers}
    title="Head and Foot Bumpers"
    description="These bumpers are designed to reduce impact and minimise the risk of injury."
    learnMoreUrl="/bed-accessories/head-and-footboard-bumpers"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          bumpers: !s.bumpers,
          // pumpHolder: !s.bumpers ? false : s.pumpHolder,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/bumpers_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={"High Safety Mat" === $configStore.safetyMat}
    title="High Safety Mat"
    description="Even-plane safety mat providing an extended surface for individuals who are prone to falling out of bed."
    learnMoreUrl="/bed-accessories/high-safety-mat"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          safetyMat: "High Safety Mat" !== s.safetyMat ? "High Safety Mat" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/safetyMat_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={"High Safety Mat with Slide Sheets" === $configStore.safetyMat}
    title="High Safety Mat with Slide Sheets"
    description="An even-plane safety mat including slide sheets to make it easier to single handedly transfer users back into bed."
    learnMoreUrl="/bed-accessories/high-safety-mat-with-slide-sheets"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          safetyMat: "High Safety Mat with Slide Sheets" !== s.safetyMat ? "High Safety Mat with Slide Sheets" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/safetyMatWithSlideSheet_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={safetySleeveException}
    active={$configStore.safetySleeve}
    title="Safety Sleeve"
    description="Encases the platform mechanism to help protect against risk of entrapment."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          safetySleeve: !s.safetySleeve,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/safetySleeve_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={juniorKitException}
    active={$configStore.juniorKit}
    title="Junior Kit"
    description="A suite of combined accessories that provide a complete solution to meet the children’s bed standard."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          juniorKit: !s.juniorKit,
          bumpers: false,
          safetySleeve: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/juniorKit_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
