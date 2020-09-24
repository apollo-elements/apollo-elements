import { makeVar } from '@apollo/client/core';
import { installRouter } from 'pwa-helpers/router';

export const locationVar = makeVar(window.location);

installRouter(locationVar);
