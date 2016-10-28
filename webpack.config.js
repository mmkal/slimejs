module.exports = {
    entry: "./ts/client/slime",
    output: {
        filename: "dist/slime.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts"]
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    }
};