// @flow
import {expect} from 'chai';
import {ErrorResponse} from "../../../api/models/ErrorResponse";


describe('Api/Models/ErrorResponse', () => {
    describe('constructor', () => {
        it('should receive a message at the instantiation', () => {
            let response = new ErrorResponse('This is an error');

            expect(response._message).to.be.equal('This is an error');
            expect(response._httpCode).to.be.equal(400);
        });
        it('should be able to receive a http status code', () => {
            let response = new ErrorResponse('This is an error', 500);

            expect(response._message).to.be.equal('This is an error');
            expect(response._httpCode).to.be.equal(500);
        });
    });

    describe('getCode', () => {
        it('should return the http code', () => {
            let response = new ErrorResponse('This is an error');

            expect(response.getCode()).to.be.equal(400);

            response = new ErrorResponse('This is an error', 500);
            expect(response.getCode()).to.be.equal(500);
        });
    });

    describe('toJSON', () => {
        it('should return a serialized view of the response', () => {
            let response = new ErrorResponse('This is an error', 500);

            expect(response.toJSON()).to.be.deep.equal({
                code: 500,
                message: 'This is an error'
            });
        });
    });


});
