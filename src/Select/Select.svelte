<script lang="ts">
  export let options: { title: string }[];
  export let value: string;
  export let title: string;

  import Chevron from "../assets/chevron.svg";
</script>

<div class="wrapper">
  <div class="value">
    <div class="title">{title}</div>
    {value}
  </div>
  <div class="custom-select-container">
    <div class="sticker">{options.length} options available</div>
    <select bind:value>
      {#each options as opt, i}
        <option value={opt.title}>{opt.title}</option>
      {/each}
    </select>
    <Chevron class="chvrn" />
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .value {
    font-size: 14px;
    flex-grow: 1;
    padding-right: 32px;

    .title {
      font-weight: 500;
      font-size: 16px;
    }
  }
  .custom-select-container {
    height: 24px;
    display: inline-block;
    min-width: 170px;

    position: relative;
    select {
      height: 24px;
      border: none;
      outline: none;
      opacity: 0;
      width: 170px;
      display: block;
    }
    .sticker {
      background: #f6f6f6;
      border-radius: 5px;
      position: absolute;
      top: 0;
      height: 100%;
      pointer-events: none;
      padding: 0 0.5rem;
      right: 32px;

      /* 6 options available */

      position: absolute;
      display: flex;
      align-items: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;

      color: #333232;
    }
  }
  :global(.chvrn) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
