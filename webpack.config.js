var path = require('path');

var webpack = require("webpack");


module.exports = {
    entry: "./src/Main.js",
    output: {
        path: __dirname + "/dist",
        filename: "main.js"
    },
    resolve: {
        root:  path.join(__dirname, "src"),
        alias: {
            "phaser": path.join(__dirname, "node_modules/phaser/dist/phaser.js"),
            "p2": path.join(__dirname, "node_modules/p2/build/p2.js"),
            "phaser-debug": path.join(__dirname, "node_modules/phaser-debug/dist/phaser-debug.js")
        },
        extensions: ["", ".js"]
    },
    //plugins: [
    //    new webpack.ProvidePlugin({
    //        PIXI: 'null'
    //    })
    //],
    module: {
        loaders:  [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    }
};
