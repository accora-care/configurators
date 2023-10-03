<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";

  import { configStore } from "../configStore";
  import { getHeadrestException } from "../isHeadrestAllowed";

  let headrestException = "";
  configStore.subscribe((state) => {
    headrestException = getHeadrestException(state);
  });

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "SIZE"} {ukStyle}>
  <!-- SIZE -->
  <form>
    <fieldset>
      <label>
        Width
        <select bind:value={$configStore.width}>
          <option value="{null}">Please select&hellip;</option>
          <option value={16}>16 inches</option>
          <option value={18}>18 inches</option>
          <option value={20}>20 inches</option>
          <option value={22}>22 inches</option>
        </select>
      </label>
    </fieldset>
    <fieldset>
      <label>
        Depth
        <select bind:value={$configStore.depth}>
          <option value="{null}">Please select&hellip;</option>
          <option value={16}>16 inches</option>
          <option value={17}>17 inches</option>
          <option value={18}>18 inches</option>
          <option value={19}>19 inches</option>
          <option value={20}>20 inches</option>
          <option value={21}>21 inches</option>
        </select>
      </label>
    </fieldset>
    <fieldset>
      <label>
        Height
        <select bind:value={$configStore.height}>
          <option value="{null}">Please select&hellip;</option>
          <option value={13}>13 inches</option>
          <option value={14}>14 inches</option>
          <option value={15}>15 inches</option>
          <option value={16}>16 inches</option>
          <option value={17}>17 inches</option>
          <option value={18}>18 inches</option>
          <option value={19}>19 inches</option>
          <option value={20}>20 inches</option>
          <option value={21}>21 inches</option>
        </select>
      </label>
    </fieldset>
  </form>
</SelectionGrid>

<style lang="scss">
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: calc(3rem / var(--root-font-size));
    row-gap: calc(2.5rem / var(--root-font-size));
    margin-bottom: calc(2.6rem / var(--root-font-size));

    fieldset {
      margin: 0;

      label {
        font-size: calc(1.4rem / var(--root-font-size));
        line-height: normal;
        color: rgba(51, 50, 50, 1);
        margin: 0;

        select {
          display: block;
          width: 100%;
          margin: calc(0.6rem / var(--root-font-size)) 0 0;
          font-size: calc(1.6rem / var(--root-font-size));
          line-height: 1.5;
          padding: calc(1.2rem / var(--root-font-size));
          padding-right: calc(4.2rem / var(--root-font-size));
          border: 1px solid rgba(0, 0, 0, 0.2);
          background-color: rgba(246, 246, 246, 1);
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='18' height='10' viewBox='0 0 18 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.6517 0.629551L17.0897 1.18905C17.1479 1.26348 17.1773 1.36025 17.1716 1.45846C17.1659 1.55668 17.1255 1.64848 17.0592 1.71405L9.26272 9.40455C9.20064 9.4657 9.12042 9.49949 9.0373 9.49949C8.95418 9.49949 8.87396 9.4657 8.81188 9.40455L1.01543 1.7148C0.948978 1.6491 0.908593 1.55709 0.90301 1.4587C0.897427 1.3603 0.927096 1.26343 0.985595 1.18905L1.4222 0.631801C1.45164 0.594356 1.48752 0.56375 1.52774 0.541758C1.56796 0.519766 1.61172 0.506825 1.6565 0.503686C1.70127 0.500546 1.74616 0.507271 1.78857 0.52347C1.83098 0.539668 1.87006 0.565019 1.90354 0.598051L8.81188 7.41555C8.87396 7.4767 8.95418 7.51048 9.0373 7.51048C9.12042 7.51048 9.20064 7.4767 9.26272 7.41555L16.1704 0.594301C16.2039 0.561313 16.243 0.536018 16.2855 0.519881C16.3279 0.503744 16.3728 0.497087 16.4176 0.500296C16.4623 0.503506 16.5061 0.516517 16.5463 0.538576C16.5865 0.560635 16.6223 0.591303 16.6517 0.628801V0.629551Z' fill='%23008871'/%3E%3C/svg%3E%0A");
          background-repeat: no-repeat;
          background-position-x: calc(100% - calc(2rem / var(--root-font-size)));
          background-position-y: 50%;

          @media screen and (max-width: 460px) {
            font-size: calc(1.4rem / var(--root-font-size));
          }
        }
      }
    }

    @media screen and (max-width: 460px) {
      grid-template-columns: 1fr;
    }
  }
</style>