module.exports = (api) => {
  const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.

  const env = isTest
    ? [
        "@babel/preset-env",
        {
          targets: {
            node: "current"
          }
        }
      ]
    : ["@babel/preset-env"];

  return {
    presets: [env, "@babel/preset-react", "@babel/preset-flow"],
    plugins: [
      "react-hot-loader/babel",
      "@babel/plugin-syntax-dynamic-import",
      "babel-plugin-jsx-control-statements",
      "@babel/plugin-proposal-export-default-from",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: true,
          regenerator: true
        }
      ],

      [
        "babel-plugin-module-resolver",
        {
          alias: {
            "^#fauna": ([, name]) => `./src/fauna/`,
            "^#database": ([, name]) => `./src/database/`,
            "^#firebase/(.+)": ([, name]) => `./src/firebase/${name}`,
            "^#firebase": ([, name]) => `./src/firebase/`,
            "^#styles/(.+)": ([, name]) => `./src/styles/${name}`,
            "^#scenes/(.+)": ([, name]) => `./src/scenes/${name}`,
            "^#instruments/(.+)": ([, name]) => `./src/instruments/${name}`,
            "^#instruments": ([, name]) => `./src/instruments`,
            "^#views/(.+)": ([, name]) => `./src/views/${name}`,
            "^#stores/(.+)": ([, name]) => `./src/stores/${name}`,
            "^#components/(.+)": ([, name]) => `./src/components/${name}`,
            "^#utilities/(.+)": ([, name]) => `./src/utilities/${name}`,
            "^std:kv-storage": "kv-storage-polyfill"
          }
        }
      ],

      [
        "babel-plugin-react-css-modules",
        {
          autoResolveMultipleImports: true,
          generateScopedName: (className, filePath) => {
            const srcSliceIndex = filePath.lastIndexOf("src/") + 4;
            const dotSliceIndex = filePath.lastIndexOf(".");
            const importantPath = filePath.substring(srcSliceIndex, dotSliceIndex);
            return importantPath.replace(/\//g, "-") + `--${className}`;
          },

          handleMissingStyleName: "warn"
        }
      ]
    ]
  };
};
