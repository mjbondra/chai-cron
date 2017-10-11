'use strict';

const camelCase = require('camel-case');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { readdir } = require('fs');
const { join } = require('path');
const proxyquire = require('proxyquire');
const sinonChai = require('sinon-chai');

const { expect } = chai;
const helpersPath = join(__dirname, '../../..', 'lib/helpers');

chai.use(dirtyChai);
chai.use(sinonChai);

describe('helpers', () => {
  let files;
  let helpers;

  beforeEach(done => {
    helpers = proxyquire(helpersPath, {});
    readdir(helpersPath, (err, data) => {
      expect(err).to.not.exist();
      expect(data).to.be.an('array');
      files = data.filter(file => /^(?!index\.js).*\.js$/.test(file));
      done();
    });
  });

  it(`should expose helper functions related to files present at ${helpersPath}`, () => {
    const expected = files.map(file => camelCase(file.replace(/\.js$/, '')));
    expected.forEach(method => expect(helpers[method]).to.be.a('function'));
  });
});
