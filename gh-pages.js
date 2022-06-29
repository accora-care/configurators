const gh = require("gh-pages");

gh.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
    repo: "git@github.com:accora-care/configurators.git", // Update to point to your repository
    dotfiles: true,
  },
  () => {
    console.log("Deploy Complete!");
  }
);
