'use strict';

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');

const stubs = require('../stubs');

const { expect } = chai;

chai.use(dirtyChai);
chai.use(sinonChai);

describe('isCronTime', () => {
  let cronParser;
  let isCronTime;
  let stubConfig;

  beforeEach(() => {
    stubConfig = {
      cronParser: {
        parseExpression: {
          err: null
        }
      }
    };
    cronParser = stubs.cronParser(stubConfig.cronParser);
    isCronTime = proxyquire('../../../lib/helpers/is-cron-time', {
      'cron-parser': cronParser
    });
  });

  describe('failure', () => {
    beforeEach(() => {
      stubConfig.cronParser.parseExpression.err = new Error();
    });

    it('should return false when cronParser.parseExpression throws an error', () => {
      const cronTime = 'foo';
      expect(isCronTime(cronTime)).to.be.false();
      expect(cronParser.parseExpression).to.have.been.calledWith(cronTime);
    });
  });

  describe('success', () => {
    it('should return true when cronParser.parseExpression does not throw an error', () => {
      const cronTime = '* * * * *';
      expect(isCronTime(cronTime)).to.be.true();
      expect(cronParser.parseExpression).to.have.been.calledWith(cronTime);
    });
  });
});
