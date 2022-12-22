const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, "./src/js/**/*.js")],
  {
    ignore: path.resolve(__dirname, "./src/js/**/_*.js"),
  }
)();

const htmlGlobPlugins = (entries, srcPath) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: "body",
        filename: `${key}.html`,
        template: `${srcPath}/${key}.html`,
        chunks: [key],
      })
  );
};

module.exports = (outputFile) => ({
  entry: entries,

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: `./js/${outputFile}.js`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `./image/[name].[contenthash][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        generator: {
          filename: `./font/[name][ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vendor: {
          test: /node_modules/i,
          name: "vendor",
        },
        vendorsModules: {
          test: /src[\\/]js[\\/]modules/i,
          name: "vendor-modules",
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },

  performance: {
    hints: false,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new WebpackWatchedGlobEntries(),

    ...htmlGlobPlugins(entries, "./src"),
    new MiniCssExtractPlugin({
      filename: `./css/${outputFile}.css`,
    }),
  ],

  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@font": path.resolve(__dirname, "./src/font/"),
      "@image": path.resolve(__dirname, "./src/images/"),
      "@js": path.resolve(__dirname, "./src/js/"),
      "@scss": path.resolve(__dirname, "./src/scss/"),
    },
  },
});
