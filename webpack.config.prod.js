const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCss = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash:8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new MiniCss({
            filename: "style.css",
          })
    ],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [MiniCss.loader, "css-loader", "sass-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                "autoprefixer",
                                "postcss-preset-env",
                                "at-rule-packer",
                            ]
                        }
                    }
                }
            ],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|gif)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'images/[name]-[hash][ext]',
                }
            },
            {
                test: /\.(jpeg|jpg|png|svg|gif)$/i,
                use: [
                {
                loader: 'image-webpack-loader',
                options: {
                mozjpeg: {
                progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                enabled: false,
                },
                pngquant: {
                quality: [0.65, 0.90],
                speed: 4
                },
                gifsicle: {
                interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                quality: 75
                }
                }
                },
                ],
                type: 'asset/resource'
            },                
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[hash][ext]',
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'icons/[name]-[hash:5][ext]',
                }
            }
        ]
    }
}