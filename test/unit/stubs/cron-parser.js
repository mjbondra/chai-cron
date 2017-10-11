'use strict';

const { spy } = require('sinon');

/**
 * creates a cron-parser stub
 * @param {Object} config - stub configuration
 * @param {Object} config.parseExpression - method configuration
 * @param {Error} [config.parseExpression.err] - method error
 * @returns {Object} - cron-parser stub
 */
module.exports = (config = {}) => {
  function parseExpression () {
    const { data, err } = config.parseExpression || {};
    if (err) throw err;
    return data;
  }

  return { parseExpression: spy(parseExpression) };
};
