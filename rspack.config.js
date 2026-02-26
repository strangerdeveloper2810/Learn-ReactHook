const path = require("path");
const { CopyRspackPlugin, HtmlRspackPlugin } = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/[name].js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                  development: !isProduction,
                  refresh: !isProduction,
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css/auto",
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(mp3|wav|ogg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["**/index.html", "**/favicon.ico"],
          },
        },
      ],
    }),
    !isProduction && new ReactRefreshPlugin(),
  ].filter(Boolean),
  experiments: {
    css: true,
  },
  devServer: {
    port: "auto",
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
};
