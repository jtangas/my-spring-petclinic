import fs from 'fs';
import path from 'path';

import renderTemplate from './index-page';

function IndexPagePlugin() {
  this.apply = compiler => {
    compiler.plugin('done', data => {
      const stats = data.toJson();
      const filenames = stats.assets.map(asset => asset.name);
      const js = '/' + filenames.find(filename => filename.match('main'));

      fs.writeFile(
        path.join(__dirname, '..', 'public', 'index.html'),
        renderTemplate(js),
        err => console.log(err),
      );
    });
  };

  return this;
}

module.exports = IndexPagePlugin;
