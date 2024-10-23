import chai from "chai";
import Kosa from "../src/index.js"
const expect = chai.expect;

describe('Kosa', () => {
  it('is an Error instance', () => {
    const error = new Kosa('OOPS');
    return expect(error instanceof Error).is.true;
  });

  it('has no stack trace', () => {
    const error = new Kosa('OOPS');
    return expect(error.stack).is.undefined;
  });

  it('create message from scope and status code', () => {
    const error = new Kosa('OOPS', 404);
    return expect(error.message).equal('OOPS_NOT_FOUND');
  });

  it('default status code to 500', () => {
    const error = new Kosa('OOPS');
    return expect(error.statusCode).equal(500);
  });

  it('manage empty scope', () => {
    const error = new Kosa();
    return expect(error.message).equal('INTERNAL_SERVER_ERROR');
  });

  it('default meta to empty object', () => {
    const error = new Kosa('OOPS');
    expect(error.meta).to.be.an('object');
    return expect(Object.keys(error.meta)).to.have.lengthOf(0);
  });

  it('has validations property', () => {
    const validations = [
      {
        field: 'email',
        message: 'missing tld'
      }, {
        field: 'firstname',
        message: 'should start with a capital'
      }
    ];
    const error = new Kosa('OOPS', 400, { validations });
    return expect(error.meta.validations).deep.equal(validations);
  });

  it('error on invalid status code', () => {
    return expect(() => new Kosa('OOPS', 123))
      .to.throw('MANAGED_ERROR_INVALID_CODE');
  });
});
