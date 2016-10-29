function RandomDotsPlugin() {
}
RandomDotsPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compile", function() {
        const dots = ["Compiling"];
        const number = Math.floor(Math.random() * 100);
        for (let i = 0; i < number; i++) {
            dots.push(".");
        }
        console.log(dots.join(""));
    });
    compiler.plugin("after-compile", function(compilation, callback) {
        const dots = ["Done"];
        const number = Math.floor(Math.random() * 100);
        for (let i = 0; i < number; i++) {
            dots.push("!");
        }
        console.log(dots.join(""));
        callback();
    });
};

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
    },
    plugins: [ new RandomDotsPlugin() ]
};