const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
	entry: {
		app: "./public/js/index.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: `${__dirname}/dist`,
	},
	plugins: [
		new WebpackPwaManifest({
			name: "Budget Tracker",
			short_name: "Finance",
			description: "An app that allows you to manage finance",
			start_url: "../index.html",
			background_color: "#01579b",
			theme_color: "#ffffff",
			fingerprints: false,
			inject: false,
		}),
	],
	mode: "development",
};

module.exports = config;
