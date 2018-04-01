const serialized = [
  '$argon2i$v=19$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g',
  '$pbkdf2-sha256$6400$0ZrzXitFSGltTQnBWOsdAw$Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M',
];

const deserialized = [
  {
    id: 'argon2i',
    raw: 'v=19',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc',
    },
    salt: Buffer.from('iHSDPHzUhPzK7rCcJgOFfg', 'base64'),
    hash: Buffer.from('J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g', 'base64'),
  },
  {
    id: 'pbkdf2-sha256',
    raw: '6400',
    salt: Buffer.from('0ZrzXitFSGltTQnBWOsdAw', 'base64'),
    hash: Buffer.from('Y11AchqV4b0sUisdZd0Xr97KWoymNE0LNNrnEgY4H9M', 'base64'),
  }
];

module.exports = {
  serialized,
  deserialized,
}
