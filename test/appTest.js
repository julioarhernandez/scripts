const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');

// Results
sayHelloResults = app.sayHello();
addNumbersResults = app.addNumbers(5, 5);
checkAnswers = app.checkAnswers();

describe('App', function(){
    describe('Say Hello', function(){
        it('Should return hello', function(){
            // let result = app.sayHello();
            assert.equal(sayHelloResults, 'hello');
        });
    
        it('Should return type string', function(){
            // let result = app.sayHello();
            assert.typeOf(sayHelloResults, 'string');
        });
    });
    describe('AddNumbers', function(){
        it('addNumber should be above 5', function(){
            // let result = app.addNumbers(3, 4);
            assert.isAbove(addNumbersResults, 5);
        });

        it('addNumber shoud return type number', function(){
            // let result = app.addNumbers(1, 1);
            assert.typeOf(addNumbersResults, 'number');
        });
    });
    describe('CheckAnswers objects', function() {
        it('Should return a promise', function(){
            expect(typeof checkAnswers).to.equal('object');
        });
    });
    describe('CheckAnswers function as a promise', function () {
        it('Should return yes or no', function(){
            return checkAnswers.then( function( answer ){
                assert.equal((answer == 'yes' ||  answer == 'no'), true);
            }).catch(function( error ){
                expect(error).to.be.undefined;
            }); 
        });
    });
});