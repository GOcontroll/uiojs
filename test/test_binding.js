const uiojs = require("./lib/binding.js")

let doublePar = new uiojs.asap_element(0x422558, uiojs.dataTypes.double, 1);
let doubleArr = new uiojs.asap_element(0x422540, uiojs.dataTypes.double, 3);
let singlePar = new uiojs.asap_element(0x422594, uiojs.dataTypes.single, 1);
let singleArr = new uiojs.asap_element(0x422588, uiojs.dataTypes.single, 3);
let int32Par  = new uiojs.asap_element(0x42257c, uiojs.dataTypes.int32,  1);
let int32Arr  = new uiojs.asap_element(0x422570, uiojs.dataTypes.int32,  3);
let uint32Par = new uiojs.asap_element(0x4225ac, uiojs.dataTypes.uint32, 1);
let uint32Arr = new uiojs.asap_element(0x4225a0, uiojs.dataTypes.uint32, 3);
let int16Par  = new uiojs.asap_element(0x42256e, uiojs.dataTypes.int16,  1);
let int16Arr  = new uiojs.asap_element(0x422568, uiojs.dataTypes.int16,  3);
let uint16Par = new uiojs.asap_element(0x42259e, uiojs.dataTypes.uint16, 1);
let uint16Arr = new uiojs.asap_element(0x422598, uiojs.dataTypes.uint16, 3);
let int8Par   = new uiojs.asap_element(0x422583, uiojs.dataTypes.int8,   1);
let int8Arr   = new uiojs.asap_element(0x422580, uiojs.dataTypes.int8,   3);
let uint8Par  = new uiojs.asap_element(0x4225b3, uiojs.dataTypes.uint8,  1);
let uint8Arr  = new uiojs.asap_element(0x4225b0, uiojs.dataTypes.uint8,  3);

let pid = 2131;

console.log("testing doubles\n");

console.log(uiojs.process_read(pid, doublePar));
uiojs.process_write(pid, doublePar, 2500.2851);
console.log(uiojs.process_read(pid, doublePar));
uiojs.process_write(pid, doublePar, 0);
console.log(uiojs.process_read(pid, doublePar));

console.log(uiojs.process_read(pid, doubleArr));
uiojs.process_write(pid, doubleArr, [2500.2851, 10.6, -1000.684]);
console.log(uiojs.process_read(pid, doubleArr));
uiojs.process_write(pid, doubleArr, [0,0,0]);
console.log(uiojs.process_read(pid, doubleArr));

console.log("testing singles\n");

console.log(uiojs.process_read(pid, singlePar));
uiojs.process_write(pid, singlePar, 2500.2851);
console.log(uiojs.process_read(pid, singlePar));
uiojs.process_write(pid, singlePar, 0);
console.log(uiojs.process_read(pid, singlePar));

console.log(uiojs.process_read(pid, singleArr));
uiojs.process_write(pid, singleArr, [2500.2851, 10.6, -1000.684]);
console.log(uiojs.process_read(pid, singleArr));
uiojs.process_write(pid, singleArr, [0,0,0]);
console.log(uiojs.process_read(pid, singleArr));

console.log("testing int32\n");

console.log(uiojs.process_read(pid, int32Par));
uiojs.process_write(pid, int32Par, 2500000);
console.log(uiojs.process_read(pid, int32Par));
uiojs.process_write(pid, int32Par, -600000);
console.log(uiojs.process_read(pid, int32Par));
uiojs.process_write(pid, int32Par, 0);
console.log(uiojs.process_read(pid, int32Par));

console.log(uiojs.process_read(pid, int32Arr));
uiojs.process_write(pid, int32Arr, [2500000, 10, -1000000]);
console.log(uiojs.process_read(pid, int32Arr));
uiojs.process_write(pid, int32Arr, [0,0,0]);
console.log(uiojs.process_read(pid, int32Arr));

console.log("testing uint32\n");

console.log(uiojs.process_read(pid, uint32Par));
uiojs.process_write(pid, uint32Par, 2500000);
console.log(uiojs.process_read(pid, uint32Par));
uiojs.process_write(pid, uint32Par, 0);
console.log(uiojs.process_read(pid, uint32Par));

console.log(uiojs.process_read(pid, uint32Arr));
uiojs.process_write(pid, uint32Arr, [2500000, 10, 1000000]);
console.log(uiojs.process_read(pid, uint32Arr));
uiojs.process_write(pid, uint32Arr, [0,0,0]);
console.log(uiojs.process_read(pid, uint32Arr));

console.log("testing int16\n");

console.log(uiojs.process_read(pid, int16Par));
uiojs.process_write(pid, int16Par, 25000);
console.log(uiojs.process_read(pid, int16Par));
uiojs.process_write(pid, int16Par, -6000);
console.log(uiojs.process_read(pid, int16Par));
uiojs.process_write(pid, int16Par, 0);
console.log(uiojs.process_read(pid, int16Par));

console.log(uiojs.process_read(pid, int16Arr));
uiojs.process_write(pid, int16Arr, [25000, 10, -10000]);
console.log(uiojs.process_read(pid, int16Arr));
uiojs.process_write(pid, int16Arr, [0,0,0]);
console.log(uiojs.process_read(pid, int16Arr));

console.log("testing uint16\n");

console.log(uiojs.process_read(pid, uint16Par));
uiojs.process_write(pid, uint16Par, 60000);
console.log(uiojs.process_read(pid, uint16Par));
uiojs.process_write(pid, uint16Par, 0);
console.log(uiojs.process_read(pid, uint16Par));

console.log(uiojs.process_read(pid, uint16Arr));
uiojs.process_write(pid, uint16Arr, [25000, 10, 45000]);
console.log(uiojs.process_read(pid, uint16Arr));
uiojs.process_write(pid, uint16Arr, [0,0,0]);
console.log(uiojs.process_read(pid, uint16Arr));

console.log("testing int8\n");

console.log(uiojs.process_read(pid, int8Par));
uiojs.process_write(pid, int8Par, 100);
console.log(uiojs.process_read(pid, int8Par));
uiojs.process_write(pid, int8Par, -98);
console.log(uiojs.process_read(pid, int8Par));
uiojs.process_write(pid, int8Par, 0);
console.log(uiojs.process_read(pid, int8Par));

console.log(uiojs.process_read(pid, int8Arr));
uiojs.process_write(pid, int8Arr, [20, 10, -100]);
console.log(uiojs.process_read(pid, int8Arr));
uiojs.process_write(pid, int8Arr, [0,0,0]);
console.log(uiojs.process_read(pid, int8Arr));

console.log("testing uint8\n");

console.log(uiojs.process_read(pid, uint8Par));
uiojs.process_write(pid, uint8Par, 200);
console.log(uiojs.process_read(pid, uint8Par));
uiojs.process_write(pid, uint8Par, 0);
console.log(uiojs.process_read(pid, uint8Par));

console.log(uiojs.process_read(pid, uint8Arr));
uiojs.process_write(pid, uint8Arr, [250, 10, 45]);
console.log(uiojs.process_read(pid, uint8Arr));
uiojs.process_write(pid, uint8Arr, [0,0,0]);
console.log(uiojs.process_read(pid, uint8Arr));