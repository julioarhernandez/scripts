const assert = require('chai').assert;
// const sayHello = require('../app').sayHello;
// const addNumbers = require('../app').addNumbers;
const app = require('../app');

// Results
sayHelloResults = app.sayHello();
addNumbersResults = app.addNumbers(5, 5);

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
});