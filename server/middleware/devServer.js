import webpack from 'webpack';
import MiddleWare from 'webpack-dev-middleware';

import config from '../../webpack.config';

module.exports = app => {
  const compiler = webpack(config());

  const devMiddleware = MiddleWare(compiler, {
    publicPath: '/',
    noInfo: false,
    stats: {
      colors: true,
    }
  });

  app.use(devMiddleware);
};
