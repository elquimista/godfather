'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactOnRails from 'react-on-rails';

function isInternalFile(file) {
  const pathComponents = file.split('/');
  for (let com of pathComponents) {
    if (com[0] === '_') {
      return true;
    }
  }
  return false;
}

export default () => {
  injectTapEventPlugin();

  const req = require.context('./components/', true, /\.js$/),
        files = req.keys();

  files.forEach(file => {
    if (isInternalFile(file)) return;

    const componentId = req.resolve(file),
          component = __webpack_require__(componentId),
          matches = file.match(/([^\/\\]+)\.js$/);
    let componentType = matches[1];

    if (componentType === 'index') {
      componentType = file.slice(0, -'/index.js'.length).match(/([^\/\\]+)$/)[1];
    }

    ReactOnRails.register({ [componentType]: component.default });
  });
}
