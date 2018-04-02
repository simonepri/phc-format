import test from 'ava';

import strictData from './fixtures/strict';

import m from '..';

test('should deserialize correct phc strings', t => {
  strictData.serialized.forEach((g, i) => {
    t.deepEqual(
      m.deserialize(strictData.serialized[i]),
      strictData.deserialized[i]
    );
  });
});

test('should thow errors if trying to deserialize an invalid phc string', async t => {
  let err = await t.throws(() => m.deserialize(null));
  t.is(err.message, 'pchstr must be a non-empty string');

  err = await t.throws(() => m.deserialize('a$invalid'));
  t.is(err.message, 'pchstr must contain a $ as first char');

  err = await t.throws(() => m.deserialize('$b$c$d$e$f'));
  t.is(err.message, 'pchstr contains too many fileds: 5/4');

  err = await t.throws(() => m.deserialize('invalid'));
  t.is(err.message, 'pchstr must contain a $ as first char');

  err = await t.throws(() => m.deserialize('$i_n_v_a_l_i_d'));
  t.regex(err.message, /id must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds_=1000'));
  t.regex(err.message, /params names must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds=1000@'));
  t.regex(err.message, /params values must satisfy/);

  err = await t.throws(() => m.deserialize('$pbkdf2$rounds:1000'));
  t.regex(err.message, /params must be in the format name=value/);

  err = await t.throws(() =>
    m.deserialize('$argon2i$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0')
  );
  t.regex(err.message, /pchstr contains unrecognized fileds/);

  err = await t.throws(() =>
    m.deserialize(
      '$argon2i$unrecognized$v=19$m=120,t=5000,p=2$EkCWX6pSTqWruiR0'
    )
  );
  t.is(err.message, 'pchstr contains too many fileds: 5/4');

  err = await t.throws(() =>
    m.deserialize(
      '$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0'
    )
  );
  t.regex(err.message, /pchstr contains unrecognized fileds/);
});
