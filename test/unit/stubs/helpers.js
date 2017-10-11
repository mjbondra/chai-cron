'use strict';

const { spy } = require('sinon');

/**
 * creates a helpers stub
 * @param {Object} [config] - stub configuration
 * @param {Object} [config.createCronTimeAssertion] - method configuration
 * @param {Error} [config.createCronTimeAssertion.err] - method error
 * @param {Boolean} [config.createCronTimeAssertion.data=() => null] - method's returned data
 * @param {Object} [config.isCronTime] - method configuration
 * @param {Error} [config.isCronTime.err] - method error
 * @param {Boolean} [config.isCronTime.data=false] - method's returned data
 * @returns {Object} - helpers stub
 */
module.exports = (config = {}) => {
  function createCronTimeAssertion () {
    const { err, data = () => null } = config.createCronTimeAssertion || {};
    if (err) throw err;
    return data;
  }

  function isCronTime () {
    const { err, data = false } = config.isCronTime || {};
    if (err) throw err;
    return data;
  }

  return {
    createCronTimeAssertion: spy(createCronTimeAssertion),
    isCronTime: spy(isCronTime)
  };
};
