//Sum all (element plus one) in array
//arr.reduce(callback[, initialValue]). 
//if initialValue not provided reduce will execute the callback function starting at index 1, 
//skipping the first index. If initialValue is provided, it will start at index 0.
var ar = [1,2,3];

var res = ar.reduce((ac, va)=> ac+va+1);
//This return 8 ([1,2+1,3+1]) is skipping the first item
console.log('Res:'+res);

var res = ar.reduce((ac, va)=> ac+va+1,0);
//This return 9 ([1+1,2+1,3+1])
console.log('Res:'+res);