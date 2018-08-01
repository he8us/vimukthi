// @flow
/* globals Symbol */
import {expect} from 'chai';
import {entries, props, values} from '../../../domain/utils/iterators';

describe('Domain/Utils/Iterators', () => {
    describe('entries', () => {
        it('should be able to iterate on an object', () => {
            let iterator = entries({
                'foo': 'bar',
                'baz': 'foobar'
            });

            // $FlowFixMe
            expect(iterator[Symbol.iterator]).to.be.a('function');
            expect(iterator.next().value).to.be.deep.equal(['foo', 'bar']);
            expect(iterator.next().value).to.be.deep.equal(['baz', 'foobar']);

            let last = iterator.next();

            expect(last.done).to.be.equal(true);
            expect(last.value).to.be.undefined;
        });
    });

    describe('props', () => {
        it('should be able to iterate on an object properties (!== methods)', () => {
            let iterator = props({
                'foo': 'bar',
                'baz': 'foobar',
                'func': () => {
                }
            });

            // $FlowFixMe
            expect(iterator[Symbol.iterator]).to.be.a('function');
            expect(iterator.next().value).to.be.equal('foo');
            expect(iterator.next().value).to.be.equal('baz');

            let last = iterator.next();

            expect(last.done).to.be.equal(true);
            expect(last.value).to.be.undefined;

        });
    });

    describe('values', () => {
        it('should be able to iterate on an object', () => {
            let iterator = values({
                'foo': 'bar',
                'baz': 'foobar'
            });

            // $FlowFixMe
            expect(iterator[Symbol.iterator]).to.be.a('function');
            expect(iterator.next().value).to.be.equal('bar');
            expect(iterator.next().value).to.be.equal('foobar');

            let last = iterator.next();

            expect(last.done).to.be.equal(true);
            expect(last.value).to.be.undefined;
        });
    });

});
