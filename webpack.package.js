const path = require("path");
const defaultConfig = require("./webpack.config.js");

const packageConfig = Object.assign(defaultConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "package", "dist"),
        filename: "[name].js",
        library: {
            name: "amount-formatter",
            type: "umd"
        }
    },

    entry: {
        "amount-formatter": path.resolve(__dirname, "package", "amount-formatter")
    },

    externals: {
        "bignumber.js": {
            commonjs: "bignumber.js",
            commonjs2: "bignumber.js",
            amd: "bignumber.js"
        }
    },

    plugins: []
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
