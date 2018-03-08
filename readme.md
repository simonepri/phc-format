<h1 align="center">
  <b>phc-format</b>
</h1>
<p align="center">
  <!-- CI - TravisCI -->
  <a href="https://travis-ci.org/simonepri/phc-format">
    <img src="https://img.shields.io/travis/simonepri/phc-format/master.svg?label=MacOS%20%26%20Linux" alt="Mac/Linux Build Status" />
  </a>
  <!-- CI - AppVeyor -->
  <a href="https://ci.appveyor.com/project/simonepri/phc-format">
    <img src="https://img.shields.io/appveyor/ci/simonepri/phc-format/master.svg?label=Windows" alt="Windows Build status" />
  </a>
  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/phc-format">
    <img src="https://img.shields.io/codecov/c/github/simonepri/phc-format/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/phc-format?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/phc-format/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/phc-format">
    <img src="https://david-dm.org/simonepri/phc-format/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Release System - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/release_system-np-6c8784.svg" alt="NP Release System used" />
  </a>

  <br/>

  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/phc-format">
    <img src="https://img.shields.io/npm/v/phc-format.svg" alt="Latest version on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/phc-format#license">
    <img src="https://img.shields.io/github/license/simonepri/phc-format.svg" alt="Project license" />
  </a>
</p>
<p align="center">
  📝 PHC string format serializer/deserializer

  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## Motivation
The [PHC String Format](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md) is an attempt to specify a common hash string format that’s a restricted & well defined subset of the Modular Crypt Format. New hashes are strongly encouraged to adhere to the PHC specification, rather than the much looser [Modular Crypt Format](https://github.com/ademarre/binary-mcf).

## Install

```bash
npm install --save @phc/format
```

## Usage

```js
const phc = require('@phc/format');

const phcobj = {
  id: 'argon2i',
  raw: 'v=19',
  params: {
    m: '120',
    t: '5000',
    p: '2',
    keyid: 'Hj5+dsK0',
    data: 'sRlHhRmKUGzdOmXn01XmXygd5Kc',
  },
  salt: Buffer.from('dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc', 'base64'),
  hash: Buffer.from('J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g', 'base64'),
};

const phcstr = "$argon2i$v=19$m=120,t=5000,p=2,keyid=Hj5+dsK0,data=sRlHhRmKUGzdOmXn01XmXygd5Kc$iHSDPHzUhPzK7rCcJgOFfg$J4moa2MM0/6uf3HbY2Tf5Fux8JIBTwIhmhxGRbsY14qhTltQt+Vw3b7tcJNEbk8ium8AQfZeD4tabCnNqfkD1g";

phc.serialize(phcobj);
// => phcstr

phc.deserialize(phcstr);
// => phcobj
```

## API

<dl>
<dt><a href="#serialize">serialize(opts)</a> ⇒ <code>string</code></dt>
<dd><p>Generates a PHC string using the data provided.</p>
</dd>
<dt><a href="#deserialize">deserialize(phcstr)</a> ⇒ <code>Object</code></dt>
<dd><p>Parses data from a PHC string.</p>
</dd>
</dl>

<a name="serialize"></a>

## serialize(opts) ⇒ <code>string</code>
Generates a PHC string using the data provided.

**Kind**: global function  
**Returns**: <code>string</code> - The hash string adhering to the PHC format.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | Object that holds the data needed to generate the PHC string. |
| opts.id | <code>string</code> | Symbolic name for the function. |
| [opts.raw] | <code>string</code> | Additinal raw data added between id and params. It's here only to support argon2 v parameter. |
| [opts.params] | <code>Object</code> | Parameters of the function. |
| [opts.salt] | <code>Buffer</code> | The salt as a binary buffer. |
| [opts.hash] | <code>Buffer</code> | The hash as a binary buffer. |

<a name="deserialize"></a>

## deserialize(phcstr) ⇒ <code>Object</code>
Parses data from a PHC string.

**Kind**: global function  
**Returns**: <code>Object</code> - The object containing the data parsed from the PHC string.  

| Param | Type | Description |
| --- | --- | --- |
| phcstr | <code>string</code> | A PHC string to parse. |

## Contributing
Contributions are REALLY welcome and if you find a security flaw in this code, PLEASE [report it](https://github.com/simonepri/phc-format/issues/new).  
Please check the [contributing guidelines](.github/contributing.md) for more details. Thanks!

## Authors
- **Simone Primarosa** -  *Follow* me on *Github* ([:octocat:@simonepri](https://github.com/simonepri)) and on  *Twitter* ([🐦@simonepri](http://twitter.com/intent/user?screen_name=simoneprimarosa))

See also the list of [contributors](https://github.com/simonepri/phc-format/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/simonepri/phc-format/LICENSE) file for details.
