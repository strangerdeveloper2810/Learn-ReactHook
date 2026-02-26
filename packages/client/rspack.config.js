const path = require("path");
const { CopyRspackPlugin, HtmlRspackPlugin, DefinePlugin } = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

const isProduction = process.env.NODE_ENV === "production";
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3001";

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: isProduction ? "static/js/[name].[contenthash:8].js" : "static/js/[name].js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@baucua/shared": path.resolve(__dirname, "../shared/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
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
        test: /\.(js|jsx)$/,
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
    new DefinePlugin({
      __SOCKET_URL__: JSON.stringify(SOCKET_URL),
    }),
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
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
};
