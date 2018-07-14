const serialized = [
  '$argon2i$v=19$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g'
];

const deserialized = [
  {
    id: 'argon2i',
    version: 19,
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: Buffer.from('sRlHhRmKUGzdOmXn01XmXygd5Kc', 'base64')
    },
    salt: Buffer.from('iHSDPHzUhPzK7rCcJgOFfg', 'base64'),
    hash: Buffer.from(
      'J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g',
      'base64'
    )
  }
];
module.exports = {
  serialized,
  deserialized
};
