'use strict';

const isCronTime = require('./is-cron-time');

/**
 * creates a function for determining the validity of a cron time expression
 * @param {Object} Assertion - Assertion class
 * @returns {function} - a function for determining the validity of a cron time expression
 */
function createCronTimeAssertion (Assertion) {
  return function () {
    const { _obj: str } = this;
    new Assertion(str).to.be.a('string');
    this.assert(
      isCronTime(str),
      `expected ${str} to be a cron time expression`,
      `expected ${str} to not be a cron time expression`
    );
  };
}

module.exports = createCronTimeAssertion;
