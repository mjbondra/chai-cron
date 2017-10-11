'use strict';

const { parseExpression } = require('cron-parser');

/**
 * check whether or not a string is a cron time expression
 * @param {String} cronTime - cron time expression
 * @returns {Boolean} - whether or not a string is a cron time expression
 */
function isCronTime (cronTime) {
  try {
    parseExpression(cronTime);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = isCronTime;
