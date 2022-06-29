import { publish } from "gh-pages";

publish(
  "build", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/accora-care/configurators.git", // Update to point to your repository
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
