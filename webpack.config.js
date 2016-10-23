module.exports = {
    entry: "./client-ts/slime",
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