const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          presets: ["@babel/react"],
        },
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",

            options: {
              javascriptEnabled: true,
            },
          },
        ],
        include: path.resolve(__dirname, "../"),
      },
    ],
  },
};
