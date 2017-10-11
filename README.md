# chai-cron

Cron time expression assertion plugin for the [Chai Assertion Library](http://chaijs.com/).

Powered by [cron-parser](https://github.com/harrisiirak/cron-parser).

## Installation

```shell
yarn add chai-cron
```

**OR**

```shell
npm i chai-cron
```

## Usage

```javascript
const chai = require('chai');
const chaiCron = require('chai-cron');

const { expect } = chai;

chai.use(chaiCron);

expect('0 0 1,15 * *').to.be.a.cron();
expect('0 0 1,15 * *').to.be.a.cronExpression();
expect('0 0 1,15 * *').to.be.a.cronTime();
expect('0 0 1,15 * *').to.be.a.cronTimeExpression();
```

## Tests

```shell
yarn test
```

**Linting**

```shell
yarn test:lint
```

**Unit Tests**

```shell
yarn test:unit
```

**Integration Tests**

```shell
yarn test:integration
```
