import App from "./configurator/App.svelte";

const app = new App({
  target: document.getElementById("content"),
  props: {
    name: "world",
  },
});

export default app;
