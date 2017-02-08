'use strict';

import deepAssign from 'deep-assign';
import noty from 'noty';

function beforeSection() {
  $.noty.defaults = deepAssign($.noty.defaults, {
    layout: 'topRight',
    theme: 'metroui',
    type: 'information',
    timeout: false,
    animation: {
      open: 'animated bounceInRight',
      close: 'animated bounceOutRight'
    },
    closeWith: ['click']
  });
}

function afterSection() {
  const { flashes } = window._SHARED_DATA;

  for (let [type, messages] of flashes) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    for (const text of messages) {
      noty({ type, text });
    }
  }
}

export { beforeSection, afterSection };
