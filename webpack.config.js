const webpack  =  require('webpack')
const path = require("path")

console.log(__dirname)

module.exports = {
    mode: "development",
    entry: './Sokoban/Sokoban.ts',
    output:{
        path: path.resolve(__dirname, 'Sokoban'),
        filename: 'Sokoban.js'
    },

    module: {
        rules: [
            {
                test: /.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}