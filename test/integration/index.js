'use strict';

const chai = require('chai');
const chaiCron = require('../../lib');

const { Assertion, expect } = chai;
const { prototype: methods } = Assertion;

chai.use(chaiCron);

describe('intergration tests', () => {
  it('should expose a method called "cron"', () => {
    expect(methods.cron).to.be.a('function');
  });

  it('should expose a method called "cronExpression"', () => {
    expect(methods.cronExpression).to.be.a('function');
  });

  it('should expose a method called "cronTime"', () => {
    expect(methods.cronTime).to.be.a('function');
  });

  it('should expose a method called "cronTimeExpression"', () => {
    expect(methods.cronTimeExpression).to.be.a('function');
  });

  it('should allow valid cron expressions', () => {
    const input = '0 0 1,15 * *';
    let err;

    try {
      expect(input).to.be.a.cronTimeExpression();
    } catch (e) {
      err = e;
    }

    expect(err).to.equal(undefined);
  });

  it('should allow negation with invalid cron expressions', () => {
    const input = 'notcron';
    let err;

    try {
      expect(input).to.not.be.a.cronTimeExpression();
    } catch (e) {
      err = e;
    }

    expect(err).to.equal(undefined);
  });


  it('should throw an error for invalid cron expressions', () => {
    const input = 'notcron';
    const expected = `expected ${input} to be a cron time expression`;
    let err;

    try {
      expect(input).to.be.a.cronTimeExpression();
    } catch (e) {
      err = e;
    }

    expect(err).to.be.an.instanceOf(Error);
    expect(err.message).to.equal(expected);
  });

  it('should throw an error for negation with valid cron expressions', () => {
    const input = '0 0 1,15 * *';
    const expected = `expected ${input} to not be a cron time expression`;
    let err;

    try {
      expect(input).to.not.be.a.cronTimeExpression();
    } catch (e) {
      err = e;
    }

    expect(err).to.be.an.instanceOf(Error);
    expect(err.message).to.equal(expected);
  });
});
