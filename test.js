import test from 'ava';

import strictData from './fixtures/strict';
import nostrictData from './fixtures/nostrict';

import m from '.';

test('should deserialize correct phc strings', t => {
  strictData.serialized.forEach((g, i) => {
    t.deepEqual(
      m.deserialize(strictData.serialized[i]),
      strictData.deserialized[i]
    );
  });
});

test('should serialize correct phc objects', t => {
  strictData.deserialized.forEach((g, i) => {
    t.deepEqual(
      m.serialize(strictData.deserialized[i]),
      strictData.serialized[i]
    );
  });
});

test('should deserialize phc strings with one unrecognized field if strict is false', t => {
  nostrictData.serialized.forEach((g, i) => {
    t.deepEqual(
      m.deserialize(nostrictData.serialized[i], false),
      nostrictData.deserialized[i]
    );
  });
});

test('should serialize phc strings with one unrecognized field if strict is false', t => {
  nostrictData.deserialized.forEach((g, i) => {
    t.deepEqual(
      m.serialize(nostrictData.deserialized[i], false),
      nostrictData.serialized[i]
    );
  });
});

test('should thow errors if trying to deserialize an invalid phc string', async t => {
  let err = await t.throws(() => m.deserialize(null));
  t.is(err.message, 'pchstr must be a string');

  err = await t.throws(() => m.deserialize('invalid'));
  t.is(err.message, 'pchstr must contain at least one $ char');

  err = await t.throws(() => m.deserialize('$i_n_v_a_l_i_d'));
  t.regex(err.message, /id must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds_=1000'));
  t.regex(err.message, /params names must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds=1000@'));
  t.regex(err.message, /params values must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds:1000'));
  t.regex(err.message, /params must be in the format name=value/);
});

test('should thow errors if trying to serialize with invalid arguments', async t => {
  let err = await t.throws(() => m.serialize(null));
  t.is(err.message, 'opts must be an object');

  err = await t.throws(() => m.serialize({}));
  t.is(err.message, 'id must be a string');

  err = await t.throws(() => m.serialize({id: 'i_n_v_a_l_i_d'}));
  t.regex(err.message, /id must satisfy/);

  err = await t.throws(() => m.serialize({id: 'pbkdf2', params: null}));
  t.regex(err.message, /params must be an object/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds_: '1000'}})
  );
  t.regex(err.message, /params names must satisfy/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds: 1000}})
  );
  t.regex(err.message, /params values must be strings/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds: '1000@'}})
  );
  t.regex(err.message, /params values must satisfy/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds: '1000'}, salt: 'string'})
  );
  t.regex(err.message, /salt must be a Buffer/);

  err = await t.throws(() =>
    m.serialize({
      id: 'pbkdf2',
      params: {rounds: '1000'},
      salt: Buffer.from('string'),
      hash: 'string',
    })
  );
  t.regex(err.message, /hash must be a Buffer/);
});
