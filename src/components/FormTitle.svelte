<script lang="ts">
  import type { InitConfig } from "../Config.types";
  export let title: string;
</script>

<div class="acc-form-title">{title}</div>

<style lang="scss" global>
  .acc-form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: calc(1.6rem / var(--root-font-size)) calc(3.2rem / var(--root-font-size));
    text-align: center;
    border-radius: var(--radius) var(--radius) 0 0;
    color: white;
    font-size: calc(1.8rem / var(--root-font-size));
    line-height: calc(2.4rem / var(--root-font-size));
    font-weight: 400;
    @media screen and (max-width: 860px) {
      display: none;
    }
  }
</style>
