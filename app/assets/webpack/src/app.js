'use strict';

import $ from 'jquery';
import * as commonScript from './common';
import registerComponents from './components-registration';

window._SHARED_DATA = window._SHARED_DATA || {};

// Run corresponding module per current Rails controller#action route.
function runSectionScript() {
  const path = $('body').data('route');
  const paths = require.context('./sections/', true, /\.js$/).keys();

  try {
    if (paths.indexOf(`./${path}.js`) >= 0) {
      require(`./sections/${path}.js`).default($(document.body));
    }
  } catch (error) {
    console.log(error);
  }
}

registerComponents();

$(() => {
  commonScript.beforeSection();
  runSectionScript();
  commonScript.afterSection();
});
