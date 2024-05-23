<script lang="ts">
  export let title: string;
  export let option: string;
  export let pumpOption: string;
  export let handlePumpOption: (option: string) => void;
  import IconTickWhite from "./assets/icon-tick-white.svg";
</script>

<div
  class:active={pumpOption === option}
  on:click|stopPropagation={() => handlePumpOption(option)}
  class="acc-grid-item-pump-option"
>
  <div class="acc-grid-item-pump-option-icon">
    <IconTickWhite />
  </div>
  <span class="acc-grid-item-pump-option-text">{title}</span>
</div>
