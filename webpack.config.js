// Webpack uses this to work with directories
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do.
module.exports = {
  // Path to your entry point. From this file, Webpack will begin its work.
  entry: "./src/js/main.js",

  // Webpack will bundle all Javascript source code into <filename> and output
  // to <path>. FYI, __dirname is the
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  plugins: [
    // Automatically creates an HTML file to add your bundled JS file via
    // the <script> tag. If a template is provided, then it will a <script>
    // tag into the template instead. By default, the generated HTML file
    // will be exported to output.path (which is defined above).
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],

  // Deploys a server to automatically (by default) load your HTML file.
  // Reduces the development process by not requiring you to manually
  // load your HTML file into your browser.
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          // Need Babel to convert JSX to JavaScript
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        // CSS-loader: resovles all URL's
        // Style-loader: properly imports CSS modules
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.(png|jpe?g|gif|doc)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer Dart-Sass
              implementation: require("sass")
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
};
