# Webpack Rails Manifest Plugin

Webpack plugin for generating rails asset compatible manifest.

## Usage

In your `webpack.config.js`

```javascript
var RailsManifestPlugin = require('webpack-rails-manifest-plugin');

module.exports = {
    // ...
    plugins: [
      new RailsManifestPlugin(
        fileName: 'manifest.json',
        outputAssetsPath: path.join(__dirname, "public", "assets")
      )
    ]
};
```

This will generate a `manifest.json` file in your root output directory with a mapping of all source file names to their corresponding output file, for example:

```json
{
  "files": {
    "test/gou-1962bf4e7379b8bf466687aab25cc450.jpg": {
      "logical_path": "test/gou.jpg",
      "mtime": "2016-03-21T06:43:46.555Z",
      "size": 6080,
      "digest": "1962bf4e7379b8bf466687aab25cc450"
    },
    "web/demo-img-19992e1f8a7dd116299fbe4e85527016.jpg": {
      "logical_path": "web/demo-img.jpg",
      "mtime": "2016-03-21T06:43:46.555Z",
      "size": 8359,
      "digest": "19992e1f8a7dd116299fbe4e85527016"
    },
    "web-3b60cccd9547273f3f6b.js": {
      "logical_path": "web.js",
      "mtime": "2016-03-21T06:43:46.555Z",
      "size": 707377,
      "digest": "3b60cccd9547273f3f6b"
    },
    "web/pages/search/show-3b60cccd9547273f3f6b.js": {
      "logical_path": "web/pages/search/show.js",
      "mtime": "2016-03-21T06:43:46.555Z",
      "size": 3550,
      "digest": "3b60cccd9547273f3f6b"
    },
    "web-3b60cccd9547273f3f6b.css": {
      "logical_path": "web.css",
      "mtime": "2016-03-21T06:43:46.555Z",
      "size": 98307,
      "digest": "3b60cccd9547273f3f6b"
    }
  },
  "assets": {
    "test/gou.jpg": "test/gou-1962bf4e7379b8bf466687aab25cc450.jpg",
    "web/demo-img.jpg": "web/demo-img-19992e1f8a7dd116299fbe4e85527016.jpg",
    "web.js": "web-3b60cccd9547273f3f6b.js",
    "web/pages/search/show.js": "web/pages/search/show-3b60cccd9547273f3f6b.js",
    "web.css": "web-3b60cccd9547273f3f6b.css"
  }
}
```


## Configuration

A manifest is configurable using constructor options:

```javascript
new RailsManifestPlugin({
  fileName: 'my-manifest.json',
  basePath: '/app/'
})
```

**Options:**

* `fileName`: The manifest filename in your output directory (`manifest.json` by default).
- `outputAssetsPath`: *Absolute* path to where the assets are built to.
  Default: `path.join(process.cwd(), 'public', 'assets')`.
