const xorCrypt = require('xor-crypt');

export function xorCode(text) {
   return xorCrypt(text);
}