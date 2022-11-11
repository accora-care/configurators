# Project info

Project built using

- Svelte
- Typescript
- SCSS

## Development

To develop app, run these commands in the command line

```
// if starting for the first time
yarn install
// then
yarn dev

```

Make sure you have `node` installed to run this project. If you don't have yarn installed

```
npm install -g yarn
```

## UMD js files for web embedding

We will need to build and compile the project first on your local machine:

```
yarn build:embed
```

New files will be created for each configurator, e.g. for empresa, these files will be created:

```
/public/empresa
   - /bundle.css
   - /empresa-configurator.js
   - /empresa-configurator.js.map
```

As a simple solution for js and css delivery we are using [jsDelivery](https://www.jsdelivr.com/), for that reason the build code **must be included in the git**. You will need to make a new release version of the repository to promote new changes.

## Empresa Configurator

Include styles in `<head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/empresa/bundle.css"
/>
```

To include empresa configurator on the website, create a div element with `id` in the desired location of the html.

```html
<div id="empresa-configurator"></div>
```

At the end of `<body>`, include this script, make sure to edit the config:

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/empresa/empresa-configurator.js"
></script>
<script defer>
  const empresaConfig = {
    mainTitle: "Customize your Accora Floor Bed",
    bookADemoHref: "https://us.accora.care/book-a-demo",
  };
  EmpresaConfigurator("empresa-configurator", empresaConfig);
</script>
```

---

## Floorbed 1 Configurator

Include styles in `<head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/floorbed1/bundle.css"
/>
```

To include empresa configurator on the website, create a div element with `id` in the desired location of the html.

```html
<div id="floorbed1-configurator"></div>
```

At the end of `<body>`, include this script, make sure to edit the config:

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/floorbed1/floorbed1-configurator.js"
></script>
<script defer>
  const floorbed1Config = {
    mainTitle: "Customize your Accora Floorbed 1",
    bookADemoHref: "https://us.accora.care/book-a-demo",
  };
  AccoraFloorbedOne("floorbed1-configurator", floorbed1Config);
</script>
```

---

## Configura Advance Configurator

Include styles in `<head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/configura-advance/bundle.css"
/>
```

To include empresa configurator on the website, create a div element with `id` in the desired location of the html.

```html
<div id="configura-advance"></div>
```

At the end of `<body>`, include this script, make sure to edit the config:

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/gh/accora-care/configurators@1.6.0/public/floorbed1/configura-advance.js"
></script>
<script defer>
  const configuraAdvanceConfig = {
    mainTitle: "Customize your Accora Configura Advance",
    bookADemoHref: "https://us.accora.care/book-a-demo",
  };
  ConfiguraAdvance("configura-advance", configuraAdvanceConfig);
</script>
```

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for _any_ path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
