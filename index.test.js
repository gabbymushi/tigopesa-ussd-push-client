var expect=require('chai').expect;
const {getToken}=require('./index');
describe('Token', function() {
describe('Test token',function(){
    it('It should return token as a string',function(){
        expect(getToken).to.be.string;
    })
});
});