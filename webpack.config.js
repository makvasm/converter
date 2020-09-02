module.exports = {
  mode: "development",
  resolve: {
      extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
      app: "./src/App.tsx"
  },
  output: {
      path: __dirname + "/src/public",
      filename: "[name].js"
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: "ts-loader"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(png|jpe?g|svg|gif)$/,
            use: "file-loader"
          }
      ]
  }

}