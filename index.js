/* eslint-disable max-params,capitalized-comments */
'use strict';

const Buffer = require('safe-buffer').Buffer;

const idRegex = /^[a-z0-9-]{1,32}$/;
const nameRegex = /^[a-z0-9-]{1,32}$/;
const valueRegex = /^[a-zA-Z0-9/+.-]+$/;
const b64Regex = /^[a-zA-Z0-9/+.-]+$/;

function objToKeyVal(obj) {
  return Object.keys(obj)
    .map(k => [k, obj[k]].join('='))
    .join(',');
}
function keyValtoObj(str) {
  const obj = {};
  str.split(',').forEach(ps => {
    const pss = ps.split('=');
    if (pss.length < 2) {
      throw new TypeError(`params must be in the format name=value`);
    }
    obj[pss.shift()] = pss.join('=');
  });
  return obj;
}

/**
 * Generates a PHC string using the data provided.
 * @param  {Object} opts Object that holds the data needed to generate the PHC
 * string.
 * @param  {string} opts.id Symbolic name for the function.
 * @param  {string} [opts.raw] Additinal raw data added between id and params.
 * It's here only to support argon2 v parameter.
 * @param  {Object} [opts.params] Parameters of the function.
 * @param  {Buffer} [opts.salt] The salt as a binary buffer.
 * @param  {Buffer} [opts.hash] The hash as a binary buffer.
 * @return {string} The hash string adhering to the PHC format.
 */
function serialize(opts) {
  const fields = [''];

  if (typeof opts !== 'object' || opts === null) {
    throw new TypeError('opts must be an object');
  }

  // Identifier Validation
  if (typeof opts.id !== 'string') {
    throw new TypeError('id must be a string');
  }
  if (!idRegex.test(opts.id)) {
    throw new TypeError(`id must satisfy ${idRegex}`);
  }
  fields.push(opts.id);

  // This is to make argon2 format compatible
  if (typeof opts.raw === 'string') {
    fields.push(opts.raw);
  }

  // Parameters Validation
  if (typeof opts.params !== 'undefined') {
    if (typeof opts.params !== 'object' || opts.params === null) {
      throw new TypeError('params must be an object');
    }
    if (!Object.keys(opts.params).every(p => nameRegex.test(p))) {
      throw new TypeError(`params names must satisfy ${nameRegex}`);
    }
    const vs = Object.values(opts.params);
    if (!vs.every(v => typeof v === 'string')) {
      throw new TypeError('params values must be strings');
    }
    if (!vs.every(v => valueRegex.test(v))) {
      throw new TypeError(`params values must satisfy ${valueRegex}`);
    }
    const strpar = objToKeyVal(opts.params);
    fields.push(strpar);
  }

  if (typeof opts.salt !== 'undefined') {
    // Salt Validation
    if (!Buffer.isBuffer(opts.salt)) {
      throw new TypeError('salt must be a Buffer');
    }
    fields.push(opts.salt.toString('base64').split('=')[0]);

    if (typeof opts.hash !== 'undefined') {
      // Hash Validation
      if (!Buffer.isBuffer(opts.hash)) {
        throw new TypeError('hash must be a Buffer');
      }
      fields.push(opts.hash.toString('base64').split('=')[0]);
    }
  }

  // Create the PHC formatted string
  const phcstr = fields.join('$');

  return phcstr;
}

/**
 * Parses data from a PHC string.
 * @param  {string} phcstr A PHC string to parse.
 * @return {Object} The object containing the data parsed from the PHC string.
 */
function deserialize(phcstr) {
  if (typeof phcstr !== 'string') {
    throw new TypeError('pchstr must be a string');
  }
  const fields = phcstr.split('$');
  if (fields.length === 1) {
    throw new TypeError('pchstr must contain at least one $ char');
  }
  // Remove first empty $
  fields.shift();

  // Parse Identifier
  const id = fields.shift();
  if (!idRegex.test(id)) {
    throw new TypeError(`id must satisfy ${idRegex}`);
  }

  let hash;
  let salt;
  if (b64Regex.test(fields[fields.length - 1])) {
    if (fields.length > 1 && b64Regex.test(fields[fields.length - 2])) {
      // Parse Hash
      hash = Buffer.from(fields.pop(), 'base64');
      // Parse Salt
      salt = Buffer.from(fields.pop(), 'base64');
    } else {
      // Parse Salt
      salt = Buffer.from(fields.pop(), 'base64');
    }
  }

  // Parse Parameters
  let params = {};
  if (fields.length > 0) {
    params = keyValtoObj(fields.pop());
    if (!Object.keys(params).every(p => nameRegex.test(p))) {
      throw new TypeError(`params names must satisfy ${nameRegex}`);
    }
    const vs = Object.values(params);
    if (!vs.every(v => valueRegex.test(v))) {
      throw new TypeError(`params values must satisfy ${valueRegex}`);
    }
  }

  // Build the output object
  const phcobj = {id};
  if (params) phcobj.params = params;
  if (salt) phcobj.salt = salt;
  if (hash) phcobj.hash = hash;
  if (hash) phcobj.hash = hash;
  if (fields.length > 0) phcobj.raw = fields.join('$');

  return phcobj;
}

module.exports = {
  serialize,
  deserialize,
};
