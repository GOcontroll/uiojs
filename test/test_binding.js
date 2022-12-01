const Uiojs = require("../lib/binding.js");
const assert = require("assert");

assert(Uiojs, "The expected function is undefined");

let dutycyle = new Uiojs.asap_element(0x422540, Uiojs.dataTypes.uint16, 1);

console.log(Uiojs.dataTypes.uint16);
console.log(dutycyle.size_t);

let pid = 2088;

function testBasic()
{
    var result = Uiojs.process_read(pid, dutycyle)
    Uiojs.process_write(pid, dutycyle, 50);
    result = Uiojs.process_read(pid, dutycyle)
    Uiojs.process_write(pid, dutycyle, 0);
}

assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");