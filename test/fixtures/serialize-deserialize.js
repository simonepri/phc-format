const serialized = [
  '$argon2i$m=120,t=5000,p=2',
  '$argon2i$m=120,t=4294967295,p=2',
  '$argon2i$m=2040,t=5000,p=255',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0ZQ',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0ZQA',
  '$argon2i$m=120,t=5000,p=2,data=sRlHhRmKUGzdOmXn01XmXygd5Kc',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc',

  '$argon2i$m=120,t=5000,p=2$/LtFjH5rVL8',
  '$argon2i$m=120,t=5000,p=2$4fXXG0spB92WPB1NitT8/OH0VKI',
  '$argon2i$m=120,t=5000,p=2$BwUgJHHQaynE+a4nZrYRzOllGSjjxuxNXxyNRUtI6Dlw/zlbt6PzOL8Onfqs6TcG',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0$4fXXG0spB92WPB1NitT8/OH0VKI',
  '$argon2i$m=120,t=5000,p=2,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$4fXXG0spB92WPB1NitT8/OH0VKI',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$4fXXG0spB92WPB1NitT8/OH0VKI',

  '$argon2i$m=120,t=5000,p=2$4fXXG0spB92WPB1NitT8/OH0VKI$iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0$4fXXG0spB92WPB1NitT8/OH0VKI$iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM',
  '$argon2i$m=120,t=5000,p=2,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$4fXXG0spB92WPB1NitT8/OH0VKI$iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$4fXXG0spB92WPB1NitT8/OH0VKI$iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$EkCWX6pSTqWruiR0',
  '$argon2i$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g',
  '$scrypt$ln=1,r=16,p=1$$d9ZXYjhleyA7GcpCwYoEl/FrSETjB0ro39/6P+3iFEL80Aad7QlI+DJqdToPyB8X6NPg+y4NNijPNeIMONGJBg',
  '$argon2i$v=19$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g'
];

const deserialized = [
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2}
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 4294967295, p: 2}
  },
  {
    id: 'argon2i',
    params: {m: 2040, t: 5000, p: 255}
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, keyid: 'Hj5+dsK0'}
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, keyid: 'Hj5+dsK0ZQ'}
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, keyid: 'Hj5+dsK0ZQA'}
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'}
  },
  {
    id: 'argon2i',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
    }
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2},
    salt: Buffer.from('/LtFjH5rVL8', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2},
    salt: Buffer.from(
      'BwUgJHHQaynE+a4nZrYRzOllGSjjxuxNXxyNRUtI6Dlw/zlbt6PzOL8Onfqs6TcG',
      'base64'
    )
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, keyid: 'Hj5+dsK0'},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64')
  },
  {
    id: 'argon2i',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
    },
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64'),
    hash: Buffer.from('iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, keyid: 'Hj5+dsK0'},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64'),
    hash: Buffer.from('iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM', 'base64')
  },
  {
    id: 'argon2i',
    params: {m: 120, t: 5000, p: 2, data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'},
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64'),
    hash: Buffer.from('iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM', 'base64')
  },
  {
    id: 'argon2i',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
    },
    salt: Buffer.from('4fXXG0spB92WPB1NitT8/OH0VKI', 'base64'),
    hash: Buffer.from('iPBVuORECm5biUsjq33hn9/7BKqy9aPWKhFfK2haEsM', 'base64')
  },
  {
    id: 'argon2i',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
    },
    salt: Buffer.from('iHSDPHzUhPzK7rCcJgOFfg', 'base64'),
    hash: Buffer.from('EkCWX6pSTqWruiR0', 'base64')
  },
  {
    id: 'argon2i',
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
    },
    salt: Buffer.from('iHSDPHzUhPzK7rCcJgOFfg', 'base64'),
    hash: Buffer.from(
      'J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g',
      'base64'
    )
  },
  {
    id: 'scrypt',
    params: {
      ln: 1,
      r: 16,
      p: 1
    },
    salt: Buffer.from('', 'hex'),
    hash: Buffer.from(
      'd9ZXYjhleyA7GcpCwYoEl/FrSETjB0ro39/6P+3iFEL80Aad7QlI+DJqdToPyB8X6NPg+y4NNijPNeIMONGJBg',
      'base64'
    )
  },
  {
    id: 'argon2i',
    version: 19,
    params: {
      m: 120,
      t: 5000,
      p: 2,
      keyid: 'Hj5+dsK0',
      data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc'
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
