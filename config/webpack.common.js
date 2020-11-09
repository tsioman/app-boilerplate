const paths = require('./paths')
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: "./src/index.jsx",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    publicPath: "/",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
};
