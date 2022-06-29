// Node.js program to demonstrate the
// fs.rename() method

// Import filesystem module
const fs = require("fs");

const variantAndColors = {};
variants();

function variants() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname + "/public/images/variants").forEach((file) => {
    console.log(file);

    const [name, color] = file.split("_");
    variantAndColors[name] = [
      ...(variantAndColors[name] || []),
      {
        color: color.replace(".png", ""),
        options: {},
      },
    ];
  });

  console.log(variantAndColors);

  try {
    fs.writeFileSync(
      __dirname + "/src/data/bed_variants.json",
      JSON.stringify(variantAndColors)
    );
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

const sidePanels = [];
variants();

function sides() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname + "/public/images/frame").forEach((file) => {
    console.log(file);

    sidePanels.push({
      title: file.replace("SidePanels-", "").replace(".png", ""),
    });
  });

  try {
    fs.writeFileSync(
      __dirname + "/src/data/sidePanels.ts",
      `export const sidePanels: { title: string }[] = ${JSON.stringify(
        sidePanels
      )}`
    );
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

sides();
