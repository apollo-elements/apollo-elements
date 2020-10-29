/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */

export function pad(num: string, size: number): string {
  const s = `000000000${num}`;
  return s.substr(s.length - size);
}

const globalCount = Object.keys(window).length;
const mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
const clientId = pad((mimeTypesLength +
  navigator.userAgent.length).toString(36) +
  globalCount.toString(36), 4);

export function fingerprint(): string {
  return clientId;
}

let getRandomValue;
if (window.crypto) {
  const lim = Math.pow(2, 32) - 1;
  getRandomValue = function() {
    return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
  };
} else
  getRandomValue = Math.random;


let c = 0;
const blockSize = 4;
const base = 36;
const discreteValues = Math.pow(base, blockSize);

function randomBlock() {
  return pad((getRandomValue() *
    discreteValues << 0)
    .toString(base), blockSize);
}

function safeCounter() {
  c = c < discreteValues ? c : 0;
  c++; // this is not subliminal
  return c - 1;
}

export function cuid(): string {
  // Starting with a lowercase letter makes
  // it HTML element ID friendly.
  const letter = 'c'; // hard-coded allows for sequential access

  // timestamp
  // warning: this exposes the exact date and time
  // that the uid was created.
  const timestamp = (new Date().getTime()).toString(base);

  // Prevent same-machine collisions.
  const counter = pad(safeCounter().toString(base), blockSize);

  // A few chars to generate distinct ids for different
  // clients (so different computers are far less
  // likely to generate the same id)
  const print = fingerprint();

  // Grab some more chars from Math.random()
  const random = randomBlock() + randomBlock();

  return letter + timestamp + counter + print + random;
}

cuid.slug = function slug() {
  const date = new Date().getTime().toString(36);
  const counter = safeCounter().toString(36).slice(-4);
  const print = fingerprint().slice(0, 1) +
      fingerprint().slice(-1);
  const random = randomBlock().slice(-2);

  return date.slice(-2) +
    counter + print + random;
};

cuid.isCuid = function isCuid(stringToCheck) {
  if (typeof stringToCheck !== 'string') return false;
  if (stringToCheck.startsWith('c')) return true;
  return false;
};

cuid.isSlug = function isSlug(stringToCheck) {
  if (typeof stringToCheck !== 'string') return false;
  const stringLength = stringToCheck.length;
  if (stringLength >= 7 && stringLength <= 10) return true;
  return false;
};

cuid.fingerprint = fingerprint;
