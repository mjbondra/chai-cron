'use strict';

const { spy } = require('sinon');

/**
 * creates an Assertion stub
 * @param {Object} config - stub configuration
 * @param {Error} [config.err] - constructor error
 * @param {Object} config.prototype - constructor prototype
 * @param {Object} config.addMethod - static method configuration
 * @param {Error} [config.addMethod.data=new Assertion()] - static method error
 * @param {Error} [config.addMethod.err] - static method error
 * @param {Object} config.prototype.a - method configuration
 * @param {Error} [config.prototype.a.err] - method error
 * @param {Object} config.prototype.assert - method configuration
 * @param {Error} [config.prototype.assert.err] - method error
 * @returns {Object} - assertion stub
 */
module.exports = (config = {}) => {
  const methodConfig = config.prototype || {};

  function Assertion (_obj) {
    const { err } = config;
    if (err) throw err;
    Object.assign(this, { _obj });
    ['to', 'be'].forEach(prop => Object.assign(this, {
      [prop]: this
    }));
  }

  function a () {
    const { err } = methodConfig.a || {};
    if (err) throw err;
  }

  function addMethod () {
    const { err, data = new Assertion() } = config.addMethod || {};
    if (err) throw err;
    return data;
  }

  function assert () {
    const { err } = methodConfig.assert || {};
    if (err) throw err;
  }

  Assertion.addMethod = spy(addMethod);
  Assertion.prototype.a = spy(a);
  Assertion.prototype.assert = spy(assert);

  return spy(Assertion);
};
