import App from "./configurator/App.svelte";

const init = (targetId: string) => {
  const app = new App({
    target: document.getElementById(targetId),
    props: {
      name: "world",
    },
  });

  return app;
};

(window as any).initEmpresaConfigurator = init;
