import request from 'supertest';
import {expect} from 'chai';
import server from '../../mocks/apiServer.js';

describe('Api/Controllers/hello_world', () => {
    describe('GET /hello', () => {

        it('should return a default string', async () => {
            let response = await request(server)
                .get('/api/hello')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body.message).to.contain('Hello, stranger!');
            return;
        });

        it('should accept a name parameter', async () => {
            let response = await request(server)
                .get('/api/hello')
                .query({name: 'Scott'})
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body.message).to.contain('Hello, Scott!');
            return;
        });
    });
});
