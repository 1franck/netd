module.exports = {
    target: "node",
    mode: "production",
    entry: "./src/main.ts",
    output: {
        filename: "app.js",
        libraryTarget: 'commonjs2',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    node: {
        cluster: "empty",
        fs: "empty",
        tls: "empty",
        net: "empty"
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.ts$/, loader: "ts-loader"}
        ]
    }
};