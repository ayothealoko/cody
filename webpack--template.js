// use path to make keep consitency between operating systems
const path = require("path");
// import plugin to minize css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// import plugin to exctract css to seprate files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "main.js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude node_modules
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // if extracted
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\(png|svg|jpg|jpeg|gif)/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    hot: true,
  },
  plugins: [new CssMinimizerPlugin()],
};
