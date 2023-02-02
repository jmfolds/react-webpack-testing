const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    "app-client": "./src/index.tsx",
  },
  output: {
    publicPath: "/",
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
  },
  mode: isProd ? "production" : "development",
  // only set devtool if not building for production
  devtool: !isProd && "source-map",
  devServer: {
    static: ".",
    hot: true,
    host: "localhost",
    port: 9000,
    liveReload: false,
    // server: "https",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [require("react-refresh-typescript")()],
          }),
          transpileOnly: isDev,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".css", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules", "./"],
  },
  plugins: [
    isDev && new ReactRefreshWebpackPlugin(),
    isDev && new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: [".jsx", ".js", ".tsx", ".ts"],
    }),
    // APP
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify: {
        removeAttributeQuotes: false,
      },
    }),
  ].filter(Boolean),
};
