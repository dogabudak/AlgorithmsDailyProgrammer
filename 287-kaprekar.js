/**
 * Created by doga on 13/10/16.
 */

/*
 Write a function that counts the number of iterations in Kaprekar's Routine, which is as follows.

 Once you get to 6174 you'll stay there if you repeat the process. In this case we applied the process 2 times before reaching 6174, so our output for 6589 is 2.
 kaprekar(6589) -> 2
 kaprekar(5455) -> 5
 kaprekar(6174) -> 0
 Numbers like 3333 would immediately go to 0 under this routine, but since we require at least two different digits in the input, all numbers will eventually reach 6174, which is known as Kaprekar's Constant.

 */

const argv = require('yargs').argv;

var GivenNumber = argv.f;

var digitsArr = [];
var maxDigit = 0;
var iterations = 0;

function divider(aNumber) {
    if (aNumber === 6174) {
        console.log(iterations)
        process.exit(0)
    }
    var finalNumber = aNumber;
    var i = 1;
    var j = 0;
    while (0 !== aNumber) {
        var ndigit = aNumber % (Math.pow(10, i));
        var adigit = (ndigit) / Math.pow(10, i - 1);
        if (adigit > maxDigit) {
            maxDigit = adigit;
            j = i;
        }
        aNumber -= ndigit;
        i++;
    }
    digitsArr.unshift(maxDigit);
    var resOf = finalNumber - (maxDigit * Math.pow(10, j - 1));

    if (resOf !== 0) {
        maxDigit = 0;
        divider(resOf)
    }
    return findRoutine(digitsArr)
}
function findRoutine(digitsArr) {
    if (digitsArr.length < 4) {
        digitsArr.unshift(0)
    }else if (digitsArr.length > 4){
        console.log("wrong type of number (Need 4 digit number)")
        process.exit(1)
    }
    var Descending = kaprekarRoutine(digitsArr)
    var Ascending = kaprekarRoutine(digitsArr.reverse());
    if (Ascending - Descending === 0) {
        console.log("wrong type of number")
        process.exit(1)
    }
    return Math.abs(Ascending - Descending)
}
function kaprekarRoutine(arrayOfSortedNumbs) {
    var conslusion = 0;
    arrayOfSortedNumbs.forEach(function (a, b) {
        conslusion += a * Math.pow(10, b)
    })
    return conslusion
}

var it = divider(GivenNumber)
while (it != 6147) {
    digitsArr = [];
    maxDigit = 0;
    iterations++;
    it = divider(it);
}
;
