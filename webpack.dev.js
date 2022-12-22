const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const outputFile = "[name]";

const bsConf = {
  start: "./dist/index.html",
};

module.exports = () =>
  merge(common(outputFile), {
    mode: "development",
    devtool: "source-map",
    watch: true,

    plugins: [
      new BrowserSyncPlugin({
        server: {
          baseDir: "./",
        },
        startPath: bsConf.start,
        notify: false,
        open: "external",
      }),
    ],
  });
