const { setDistEntries } = require('../../node_modules/vite-plugin-ssr/dist/cjs/node/plugin/plugins/distEntries/loadDistEntries.js');
setDistEntries({
  pageFiles: () => import('./pageFiles.mjs'),
  clientManifest: () => require('../client/manifest.json'),
  pluginManifest: () => require('../client/vite-plugin-ssr.json'),
});
