import 'urlpattern-polyfill';

import { installRouter } from 'pwa-helpers/router';

import { makeVar } from '@apollo/client/core';

const pattern = new URLPattern({ pathname: '/users/:username' });

const getLocation = (loc = window.location) => ({ ...loc,
  groups: pattern.exec(loc.pathname)?.pathname?.groups
})

export const locationVar = makeVar(getLocation());

installRouter(loc => locationVar(getLocation(loc)));
