import test from 'ava';

import sdData from './fixtures/serialize-deserialize';

import m from '..';

test('should serialize correct phc objects', t => {
  sdData.deserialized.forEach((g, i) => {
    t.deepEqual(m.serialize(sdData.deserialized[i]), sdData.serialized[i]);
  });
  });
});

test('should thow errors if trying to serialize with invalid arguments', async t => {
  let err = await t.throws(() => m.serialize(null));
  t.is(err.message, 'opts must be an object');

  err = await t.throws(() => m.serialize({}));
  t.is(err.message, 'id must be a string');

  err = await t.throws(() => m.serialize({id: 'i_n_v_a_l_i_d'}));
  t.regex(err.message, /id must satisfy/);

  err = await t.throws(() => m.serialize({id: 'pbkdf2', params: null}));
  t.is(err.message, 'params must be an object');

  err = await t.throws(() => m.serialize({id: 'pbkdf2', params: {i: {}}}));
  t.is(err.message, 'params values must be strings');

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds_: '1000'}})
  );
  t.regex(err.message, /params names must satisfy/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds: '1000@'}})
  );
  t.regex(err.message, /params values must satisfy/);

  err = await t.throws(() =>
    m.serialize({id: 'pbkdf2', params: {rounds: '1000'}, salt: 'string'})
  );
  t.is(err.message, 'salt must be a Buffer');

  err = await t.throws(() => m.serialize({id: 'argon2id', version: -10}));
  t.is(err.message, 'version must be a positive integer number');

  err = await t.throws(() =>
    m.serialize({
      id: 'pbkdf2',
      params: {rounds: '1000'},
      salt: Buffer.from('string'),
      hash: 'string'
    })
  );
  t.is(err.message, 'hash must be a Buffer');
});
