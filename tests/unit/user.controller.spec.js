const mocha = require('mocha');
const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiSubset = require('chai-subset');
const chaiSorted = require('chai-sorted');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(chaiSorted);
chai.use(chaiSubset);
chai.use(sinonChai);


describe('generic tests', function() {
  it('tests something', async function() {
  });
});
