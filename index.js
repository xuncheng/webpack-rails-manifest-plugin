var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

function RailsManifestPlugin(opts) {
  this.opts = _.assign({
    fileName: 'manifest.json',
    outputAssetsPath: path.join(process.cwd(), 'public', 'assets')
  }, opts || {});
}

RailsManifestPlugin.prototype.apply = function(compiler) {
  var outputAssetsPath   = this.opts.outputAssetsPath;
  var outputManifestFile = path.join(outputAssetsPath, this.opts.fileName);

  compiler.plugin('done', function(stats) {
    var manifest = { 'files': {}, 'assets': {} };

    // Loop through all compiled assets,
    for (var filename in stats.compilation.assets) {
      ext = '.' + filename.split('.').pop();
      digest = filename.split('-').pop().split('.')[0];
      logicalPath = filename.split('-').slice(0, -1).join('-') + ext;
      absolutePath = path.join(outputAssetsPath, filename);
      // logicalPath = filename.replace("-" + digest, "");
      manifest['assets'][logicalPath] = filename;
      manifest['files'][filename] = {
        'logical_path': logicalPath,
        'mtime': new Date(),
        'size': fs.statSync(absolutePath)['size'],
        'digest': digest
      };
    }

    fs.writeFileSync(outputManifestFile, JSON.stringify(manifest, null, 2))
  });
};

module.exports = RailsManifestPlugin;
