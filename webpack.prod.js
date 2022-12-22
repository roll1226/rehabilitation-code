const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ESLintPlugin = require("eslint-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const outputFile = "[name].[chunkhash]";

module.exports = () =>
  merge(common(outputFile), {
    mode: "production",

    plugins: [
      new ESLintPlugin({
        fix: true,
      }),

      new ImageminPlugin({
        pngquant: {
          quality: "60-70",
        },
        gifsicle: {
          optimizationLevel: 3,
        },
        svgo: {},
        plugins: [
          ImageminMozjpeg({
            quality: 65,
          }),
        ],
      }),
    ],
  });
