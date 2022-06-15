import App from "./App.svelte";

const app = new App({
  target: document.getElementById("content"),
  props: {
    name: "world",
  },
});

export default app;
