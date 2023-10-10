// Webpack uses this to work with directories
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    // Path to your entry point. From this file Webpack will begin its work
    entry: './src/javascript/index.js',


    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                // test is a regular expression for file extension which we are going to transform
                test: /\.js$/,
                // exclude is a regular expression that tells Webpack which path should be ignored when transforming modules
                exclude: /(node_modules)/,

                // use is the main rule's option. Here we set loader, which is going to be applied to files that correspond to test regexp (JavaScript files in this case)
                use: {
                    loader: 'babel-loader',

                    // options can vary depending on the loader. In this case, we set default presets for Babel to consider which ES6 features it should transform and which not. It is a separate topic on its own, and you can dive into it if you are interested, but it's safe to keep it like this for now.
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,

                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                    {
                        // After all CSS loaders, we use a plugin to do its work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // This loader resolves url() and @imports inside CSS
                        loader: "css-loader",
                    },
                    {
                        // Then we apply postCSS fixes like autoprefixer and minifying
                        loader: "postcss-loader"
                    },
                    {
                        // First we transform SASS to standard CSS
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })

    ],

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript 
    // minifying and other things, so let's set mode to development
    mode: 'development'
}