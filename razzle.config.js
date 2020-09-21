"use strict";

const razzleHeroku = require("razzle-heroku");

module.exports = {
  plugins: [{
    name: "typescript",
    options: {
      forkTsChecker: {
        typescript: false,
      },
    },
  }, ],
  modify: (config, {
    target,
    dev
  }, webpack) => {
    config = razzleHeroku(config, {
      target,
      dev
    }, webpack);
    if (target == "web") {
      config.node = {
        fs: "empty",
        module: "empty"
      };
    }
    if (process.env.ANALYZER) {
      const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    if (!dev && target === "web") {
      config.output.filename = "static/js/[name].[hash:8].js";
      config.entry.vendor = ["react", "react-dom", "iotex-antenna", "mobx", "axios"];
      Object.assign(config.optimization, {
        splitChunks: {
          chunks: "all",
          name: false,
        },
      });
    }

    return config;
  },
};