import compose from 'crocks/helpers/compose';
import { defineCE } from '@open-wc/testing';

export const getMixinInstance = mixinFunction =>
  compose(document.createElement.bind(document), defineCE, mixinFunction);
