'use strict';

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');

const stubs = require('../stubs');

const { expect } = chai;

chai.use(dirtyChai);
chai.use(sinonChai);

describe('createCronTimeAssertion', () => {
  let Assertion;
  let createCronTimeAssertion;
  let helpers;
  let stubConfig;

  beforeEach(() => {
    stubConfig = {
      Assertion: {
        err: null,
        prototype: {
          a: {
            err: null
          },
          assert: {
            err: null
          }
        }
      },
      helpers: {
        isCronTime: {
          data: true,
          err: null
        }
      }
    };
    Assertion = stubs.Assertion(stubConfig.Assertion);
    helpers = stubs.helpers(stubConfig.helpers);
    createCronTimeAssertion = proxyquire('../../../lib/helpers/create-cron-time-assertion', {
      './is-cron-time': helpers.isCronTime
    });
  });

  it('should return a function', () => {
    expect(createCronTimeAssertion(Assertion)).to.be.a('function');
  });

  describe('returned function', () => {
    let ctx;
    let fn;
    let str;

    beforeEach(() => {
      str = 'foo';
      ctx = new Assertion(str);
      fn = createCronTimeAssertion(Assertion).bind(ctx);
    });

    describe('failure', () => {
      it('should throw an error when string assertion fails', () => {
        const err = stubConfig.Assertion.prototype.a.err = new Error();
        expect(fn.bind(ctx)).to.throw(err);
        expect(Assertion.prototype.a).to.have.been.called();
      });

      it('should throw an error this.assert fails', () => {
        const err = stubConfig.Assertion.prototype.assert.err = new Error();
        expect(fn.bind(ctx)).to.throw(err);
        expect(ctx.assert).to.have.been.called();
      });
    });

    describe('success', () => {
      it('should not throw an error when assertion succeeds', () => {
        expect(fn.bind(ctx)).to.not.throw();
      });
    });
  });
});
