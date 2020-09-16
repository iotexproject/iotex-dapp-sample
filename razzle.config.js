"use strict";

const razzleHeroku = require("razzle-heroku");

module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        forkTsChecker: {
          typescript: false,
        },
      },
    },
    "scss",
  ],
  modify: (config, { target, dev }, webpack) => {
    config = razzleHeroku(config, { target, dev }, webpack);
    if (target == "web") {
      config.node = { fs: "empty", module: "empty" };
    }
    if (process.env.ANALYZER) {
      const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    if (!dev && target === "web") {
      config.output.filename = dev ? "static/js/[name].js" : "static/js/[name].[hash:8].js";

      config.entry.vendor = [require.resolve("react"), require.resolve("react-dom"), require.resolve("iotex-antenna")];

      config.optimization = {
        splitChunks: {
          chunks: "all",
          name: false,
        },
      };
    }

    return config;
  },
};
