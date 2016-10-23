module.exports = {
    entry: "./generated-ts/WorldCupSoccerSlime",
    output: {
        filename: "dist/slime.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts"]
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "^transpilation" }
        ]
    }
};