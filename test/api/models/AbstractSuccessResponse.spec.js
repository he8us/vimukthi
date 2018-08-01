// @flow
import {expect} from 'chai';
import {AbstractSuccessResponse} from "../../../api/models/AbstractSuccessResponse";
import {Exception} from "../../../domain/Errors/Exception";


describe('Api/Models/AbstractSuccessResponse', () => {
    describe('getCode', () => {
        it('should return 200', () => {
            let response = new AbstractSuccessResponse();

            expect(response.getCode()).to.equal(200);
        });
    });

    describe('toJSON', () => {
        it('should throw an exception because the class is an abstract', () => {
            let response = new AbstractSuccessResponse();

            expect(() => {
                response.toJSON();
            }).to.throw(Exception);
        });
    });
});
