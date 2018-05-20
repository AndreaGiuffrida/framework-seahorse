/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const open = require('open');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8000 : process.env.PORT;
const app = express();

var page = "index.html";

if (isDeveloping) {

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: '',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/' + page)));
    res.end();
  });

} else {

  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/' + page));
  });

}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  open('http://localhost:8000');
  console.info('==> 🌎 Listening on port %s.', port, port);
});
