
var path = require('path');
var webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin')
var vtkRules = require('vtk.js/Utilities/config/dependency.js').webpack.core.rules;

// Optional if you want to load *.css and *.module.css files
var cssRules = require('vtk.js/Utilities/config/dependency.js').webpack.css.rules;

var entry = path.join(__dirname, './src/index.html');
const sourcePath = path.join(__dirname, './src');
const outputPath = path.join(__dirname, './dist');

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: {
    polyfills: 'src/polyfills.ts',
    styles: "./src/styles.css",
    main: './src/main.ts'
  },
  output: {
    path: outputPath,
    filename: 'MyWebApp.js',
  },
  module: {
    rules: [
      { //this rule will only be used for any vendors
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: [/node_modules/]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader'],
        exclude: [/node_modules/] //add this line so we ignore css coming from node_modules
      },
    ].concat(vtkRules/* , cssRules */),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
        from: path.join(__dirname, 'node_modules', 'itk', 'WebWorkers'),
        to: path.join(__dirname, 'dist', 'itk', 'WebWorkers'),
        },
        {
        from: path.join(__dirname, 'node_modules', 'itk', 'ImageIOs'),
        to: path.join(__dirname, 'dist', 'itk', 'ImageIOs'),
        },
        {
        from: path.join(__dirname, 'node_modules', 'itk', 'PolyDataIOs'),
        to: path.join(__dirname, 'dist', 'itk', 'PolyDataIOs'),
        },
        {
        from: path.join(__dirname, 'node_modules', 'itk', 'MeshIOs'),
        to: path.join(__dirname, 'dist', 'itk', 'MeshIOs'),
        },
        {
        from: "src/assets",
        to: "assets",
        },
        {
        from: "src/itk/web-build/",
        to: "itk/Pipelines/",
        }
      ]
    }),
  ],
  performance: {
      maxAssetSize: 10000000
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
};

/* const webpack = require('webpack');
const vtkRules = require('vtk.js/Utilities/config/dependency').webpack;

module.exports = {
  module: {
    rules: vtkRules.core.rules,
  },
}; */