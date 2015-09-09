var path = require('path');

var webpack = require("webpack");

var phaserPath = path.join(__dirname, '/node_modules/phaser/dist/phaser.js'),
    phaserDebugPath = path.join(__dirname, '/node_modules/phaser-debug/dist/phaser-debug.js');

module.exports = {
    entry: "./src",
    output: {
        path: __dirname + "/dist",
        filename: "main.js"
    },
    resolve: {
        root:  path.join(__dirname, "src"),
        alias: {
            "phaser": phaserPath,
            "phaser-debug": phaserDebugPath
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
            },
            {
                test: /phaser\.js$/i,
                loader: 'phaser-shim-loader'
            }
            //{
            //    test: /phaser-debug\.js$/i,
            //    loader: 'phaser-debug-webpack-loader'
            //}
        ]
    }
};
