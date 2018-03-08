/* eslint-disable max-params,capitalized-comments,complexity */
'use strict';

const Buffer = require('safe-buffer').Buffer;

const idRegex = /^[a-z0-9-]{1,32}$/;
const nameRegex = /^[a-z0-9-]{1,32}$/;
const valueRegex = /^[a-zA-Z0-9/+.-]+$/;
const b64Regex = /^[a-zA-Z0-9/+.-]+$/;

function objToKeyVal(obj) {
  return objectKeys(obj)
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
function objectKeys(object) {
  return Object.keys(object);
}
function objectValues(object) {
  if (typeof Object.values === 'function') return Object.values(object);
  return objectKeys(object).map(k => object[k]);
}

/**
 * Generates a PHC string using the data provided.
 * @param  {Object} opts Object that holds the data needed to generate the PHC
 * string.
 * @param  {string} opts.id Symbolic name for the function.
 * @param  {string} [opts.raw] Additional raw data added after the identifier.
 * It's here to support argon2 v parameter and to generate MCF formatted strings.
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
    if (!objectKeys(opts.params).every(p => nameRegex.test(p))) {
      throw new TypeError(`params names must satisfy ${nameRegex}`);
    }
    const vs = objectValues(opts.params);
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
 * @param  {boolean} strict If false does not throw an error if there is
 * one filed not unrecognized. The content of the unrecognized filed will be
 * stored in the raw property of the output object. This is useful to parse
 * out of specs parameters like the 'v' present in the argon2 hash format or
 * to parse MCF formatted strings.
 * @return {Object} The object containing the data parsed from the PHC string.
 */
function deserialize(phcstr, strict) {
  strict = strict !== false;

  if (typeof phcstr !== 'string') {
    throw new TypeError('pchstr must be a string');
  }
  const fields = phcstr.split('$');

  // Parse Fields
  if (fields.length === 1) {
    throw new TypeError('pchstr must contain at least one $ char');
  }
  // Remove first empty $
  fields.shift();
  let maxf = 5;
  if (strict) maxf--;
  if (fields.length > maxf) {
    throw new TypeError(
      `pchstr contains too many fileds: ${fields.length}/${maxf}`
    );
  }

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
  let params;
  if (fields.length > 0) {
    const parstr = fields.pop();
    let isKeyVal = false;
    try {
      params = keyValtoObj(parstr);
      isKeyVal = true;
    } catch (err) {
      if (strict) {
        throw err;
      }
      fields.push(parstr);
    }
    if (isKeyVal) {
      if (!objectKeys(params).every(p => nameRegex.test(p))) {
        throw new TypeError(`params names must satisfy ${nameRegex}`);
      }
      const vs = objectValues(params);
      if (!vs.every(v => valueRegex.test(v))) {
        throw new TypeError(`params values must satisfy ${valueRegex}`);
      }
    }
  }

  // Parse Raw Data if not in strict mode
  let raw;
  if (fields.length > 0) {
    if (strict) {
      throw new TypeError(
        `pchstr contains unrecognized fileds: ${fields.length}/0`
      );
    }
    if (fields.length !== 1) {
      throw new TypeError(
        `pchstr contains too many unrecognized fileds: ${fields.length}/1`
      );
    }
    raw = fields.pop();
  }

  // Build the output object
  const phcobj = {id};
  if (params) phcobj.params = params;
  if (salt) phcobj.salt = salt;
  if (hash) phcobj.hash = hash;
  if (raw) phcobj.raw = raw;

  return phcobj;
}

module.exports = {
  serialize,
  deserialize,
};
