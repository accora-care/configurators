<script lang="ts">
  export let length: number;
  export let title: string;
  export let value: string = "";

  import IconAccessory from "./assets/icon-accessory.svg";

  const Icon = IconAccessory;
</script>

<div class="acc-customization-select noclick">
  <div class="acc-customization-icon-container">
    <Icon class="acc-customization-icon-container__icon" />
  </div>

  <div class="acc-customization-content">
    <div class="title">{title}</div>
    {#if value}
      <div class="value">
        {value}
      </div>
    {/if}
  </div>
  <div class="acc-select-container">
    <div class="acc-select-container__sticker">
      {length} options
      <span class="acc-select-container__sticker__available"
        >&nbsp;available</span
      >
    </div>
  </div>
</div>

<style lang="scss" global>
  .acc-customization-content {
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 1.6rem;
    .title {
      font-weight: 500;
      font-size: 1.6rem;
    }
    .value {
      font-size: 1.4rem;
      flex-grow: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .acc-customization-select {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-right: 1.6rem;
    &.noclick {
      padding-right: 0;
      cursor: initial;
      &:hover {
        .title {
          color: var(--text-primary);
        }
      }
      // select container
      .acc-select-container {
        height: 2.4rem;
        flex-grow: 1;

        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .acc-select-container__sticker {
          background: #f6f6f6;
          border-radius: 0.5rem;
          height: 100%;
          pointer-events: none;
          padding: 0 0.8rem;
          right: 3.2rem;
          margin-right: 0rem;

          white-space: nowrap;

          /* 6 options available */

          display: flex;
          align-items: center;

          font-weight: 400;
          font-size: 1.2rem;
          line-height: 1.6rem;
          text-align: center;

          color: #333232;
          .acc-select-container__sticker__available {
            @media screen and (max-width: 1200px) {
              display: none;
            }
          }
        }
      }
    }
  }
  .acc-customization-icon-container {
    padding: 1.6rem;
    flex-shrink: 0;
    @media screen and (max-width: 1200px) {
      padding-left: 0;
    }
  }
</style>
