// require("babel-register");

// const router = require("./App.tsx").default;
// const Sitemap = require("../").default;

// new Sitemap(router)
//   .build("https://whyareyoubuyingthis.com")
//   .save("../public/sitemap.xml");

const buildSitemap = require("react-build-sitemap");

buildSitemap(
  "./App.tsx",
  "../public/sitemap.xml",
  "https://whyareyoubuyingthis.com"
);
