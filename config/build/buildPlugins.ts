import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import Dotenv from 'dotenv-webpack';


export function buildPlugins({
                                 paths, isDev, apiUrl, googleClientId,
                             }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new Dotenv(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(process.env.API_URL || apiUrl),
            __CLIENT_ID_GOOGLE__: JSON.stringify(process.env.GOOGLE_CLIENT_ID || ''|| googleClientId),
        }),
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
    ];

    if (isDev) {
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
}