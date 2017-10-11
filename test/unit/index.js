'use strict';

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');

const stubs = require('./stubs');

const { expect } = chai;

chai.use(dirtyChai);
chai.use(sinonChai);

describe('chai-cron', () => {
  let Assertion;
  let chaiCron;
  let helpers;
  let stubConfig;

  beforeEach(() => {
    stubConfig = {
      Assertion: {
        err: null,
        addMethod: {
          err: null
        }
      },
      helpers: {
        createCronTimeAssertion: {
          data: () => null,
          err: null
        }
      }
    };
    Assertion = stubs.Assertion(stubConfig.Assertion);
    helpers = stubs.helpers(stubConfig.helpers);
    chaiCron = proxyquire('../../lib', {
      './helpers': helpers
    });
  });

  describe('failure', () => {
    it('should fail when Assertion.addMethod throws an error', () => {
      const err = stubConfig.Assertion.addMethod.err = new Error();
      expect(chaiCron.bind(null, { Assertion })).to.throw(err);
      expect(Assertion.addMethod).to.have.been.called();
    });
  });

  describe('success', () => {
    it('should not throw an error when Assertion.addMethod succeeds', () => {
      expect(chaiCron.bind(null, { Assertion })).to.not.throw();
      expect(Assertion.addMethod).to.have.been.called();
    });
  });
});
