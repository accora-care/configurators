<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getMatressInfillException, getBedExtensionException, getMattressExtensionFoamException, getBedExtensionKitException } from "../isOptionAllowed";

  let matressInfillException = "";
  let bedExtensionException = "";
  let mattressExtensionFoamException = "";
  let bedExtensionKitException = "";

  configStore.subscribe((state) => {
    matressInfillException = getMatressInfillException(state);
    bedExtensionException = getBedExtensionException(state);
    mattressExtensionFoamException = getMattressExtensionFoamException(state);
    bedExtensionKitException = getBedExtensionKitException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "EXTRAS"} ukStyle={true}>
  <SelectionGridItem
    active={$configStore.pumpHolder}
    title="Mattress Pump Holder"
    description="The pump holder easily fits over the end of the bed to hold the pump of an alternating air mattresses."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pumpHolder: !s.pumpHolder,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/pumpHolder_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={matressInfillException}
    active={$configStore.mattressInfill}
    title="Mattress Infill"
    disabled={null !== matressInfillException}
    description="Fits down both sides of a standard mattress in between the mattress and the side rail."
    learnMoreUrl="/bed-accessories/mattress-infill"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattressInfill: !s.mattressInfill,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/mattressInfill_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={bedExtensionException}
    active={$configStore.bedExtension}
    title="Bed Extension"
    disabled={null !== bedExtensionException}
    description="Allows our FloorBed to be extended by 200mm length."
    learnMoreUrl="/bed-accessories/bed-extension"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          bedExtension: !s.bedExtension,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/bedExtension_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={mattressExtensionFoamException}
    active={$configStore.mattressExtensionFoam}
    title="Mattress Extension Foam"
    disabled={null !== mattressExtensionFoamException}
    description="200 mm (20 cm) mattress infill to be used when the bed is extended by 200 mm."
    learnMoreUrl="/bed-accessories/mattress-extension-foam"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattressExtensionFoam: !s.mattressExtensionFoam,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/mattressExtensionFoam_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={bedExtensionKitException}
    active={$configStore.bedExtensionKit}
    title="Bed Extension Kit"
    disabled={null !== bedExtensionKitException}
    description="Includes mattress frame extension and mattress extension foam to provide an  extra 200mm in length."
    learnMoreUrl="/bed-accessories/bed-extension-kit"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        const nextState = !s.safetyMat;
        return {
          ...s,
          bedExtensionKit: !s.bedExtensionKit,
          bedExtension: false,
          mattressExtensionFoam: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/bedExtensionKit_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
