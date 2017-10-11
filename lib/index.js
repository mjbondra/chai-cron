'use strict';

const { createCronTimeAssertion } = require('./helpers');

module.exports = ({ Assertion }) => {
  const cronTimeAssertion = createCronTimeAssertion(Assertion);

  Assertion.addMethod('cron', cronTimeAssertion);
  Assertion.addMethod('cronExpression', cronTimeAssertion);
  Assertion.addMethod('cronTime', cronTimeAssertion);
  Assertion.addMethod('cronTimeExpression', cronTimeAssertion);
};
