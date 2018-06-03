# References
1. https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
# Before notes
- 1. Compared to an ES2015 project, we use the typescript package instead of babel-core and babel-preset-es2015 packages
- 2. Similarly, we use the awesome-typescript-loader instead of babel-loader
- 3. Instead of a .babelrc file in ES2015 projects, we use a tsconfig.json to override the default TypeScript compiler options.
# Build app
1. $ npm init
2. $ npm install --save react react-dom @types/react @types/react-dom
3. $ npm install --save-dev webpack webpack-cli webpack-merge webpack-dev-server
4. $ npm install --save-dev typescript awesome-typescript-loader source-map-loader
5. Add root folder add file tsconfig.json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
5. Create `src` folder, `src/index.html`, `src/index.tsx`, `src/App.tsx`
# 5.1 `index.html`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webpack + Redux + TypeScript</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="main.bundle.js"></script>
    </body>
</html>

# 5.2 `index.tsx`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
- Noted: In typescript just import like this
import * as React from 'react';
import * as ReactDOM from 'react-dom';
Not like react in js:
import React from 'react';
import ReactDOM from 'react-dom';
# 5.3 `App.tsx`
import * as React from 'react';
// import './App.css';
class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Wepack React Typscript</h1>
                </header>
            </div>
        );
    }
}
export default App;
6. Webpack Configuration
- $ npm install --save-dev clean-webpack-plugin html-webpack-plugin
- Create file `webpack.config.js`
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.tsx',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
}
7. Package.json change
"scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
},
8. Change Webpack.config.js to webpack.common.js; webpack.dev.js; webpack.prod.js
"scripts": {
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
},
9. If we want to use import CSS, SASS as well as images to .tsx files, we need to install bellow:
$ npm i -D style-loader css-loader sass-loader file-loader node-sass
and config them in webpack.config.js:
{
    test: /\.css$/,
    loaders: ['style-loader','css-loader'],
},
{
    test: /\.scss$/,
    loaders: ['style-loader','css-loader','sass-loader']
}
// for files
{
    test: /\.(png|jpg|gif|svg)$/,
    use: [
    {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'images/'
        }
    }]
}
10. Reload when change files
devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    // host: '0.0.0.0',
    port: 3107,
    watchContentBase: true, // reload when any file change
},
11. Import in TypesScript
    1. node packages
    import * as React from 'react';
    2. css/sass files
    import './App.css';
    `3. image files` because tsx doesnt undestannd automatically when we import files 11*
    import logo from './logo.svg;
11* Importing Other Assets
    1. at src folder create custome.d.ts (maybe at other folder) src/custom.d.ts
    2. inside custom.d.ts:
        declare module '*.svg'
        declare module '*.png'
        declare module '*.jpg'
    3. Webpack tuto https://webpack.js.org/guides/typescript/

# Errors
1.
ERROR in [at-loader] ./node_modules/@types/node/index.d.ts:6208:55
    TS2304: Cannot find name 'Map'.
ERROR in [at-loader] ./node_modules/@types/node/index.d.ts:6215:55
    TS2304: Cannot find name 'Set'.
ERROR in [at-loader] ./node_modules/@types/node/index.d.ts:6219:64
    TS2304: Cannot find name 'Symbol'.
ERROR in [at-loader] ./node_modules/@types/node/index.d.ts:6225:59
    TS2304: Cannot find name 'WeakMap'.
ERROR in [at-loader] ./node_modules/@types/node/index.d.ts:6226:59
    TS2304: Cannot find name 'WeakSet'.
=> In tsconfig.json => `"target": "es6"`, Because Map, Set and Promise are ES6 features