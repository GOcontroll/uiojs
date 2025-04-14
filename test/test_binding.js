import { dataTypes, asap_element, process_read, process_write } from "../lib/binding.js";

let doublePar = new asap_element(0x422558, dataTypes.double, 1);
let doubleArr = new asap_element(0x422540, dataTypes.double, 3);
let singlePar = new asap_element(0x422594, dataTypes.single, 1);
let singleArr = new asap_element(0x422588, dataTypes.single, 3);
let int32Par  = new asap_element(0x42257c, dataTypes.int32,  1);
let int32Arr  = new asap_element(0x422570, dataTypes.int32,  3);
let uint32Par = new asap_element(0x4225ac, dataTypes.uint32, 1);
let uint32Arr = new asap_element(0x4225a0, dataTypes.uint32, 3);
let int16Par  = new asap_element(0x42256e, dataTypes.int16,  1);
let int16Arr  = new asap_element(0x422568, dataTypes.int16,  3);
let uint16Par = new asap_element(0x42259e, dataTypes.uint16, 1);
let uint16Arr = new asap_element(0x422598, dataTypes.uint16, 3);
let int8Par   = new asap_element(0x422583, dataTypes.int8,   1);
let int8Arr   = new asap_element(0x422580, dataTypes.int8,   3);
let uint8Par  = new asap_element(0x4225b3, dataTypes.uint8,  1);
let uint8Arr  = new asap_element(0x4225b0, dataTypes.uint8,  3);
let boolPar   = new asap_element(0x4225b3, dataTypes.boolean,1);
let boolArr  = new asap_element(0x4225b0, dataTypes.boolean,3);

let pid = 2131;

console.log("testing doubles\n");

console.log(process_read(pid, doublePar));
process_write(pid, doublePar, 2500.2851);
console.assert(process_read(pid, doublePar) == 2500.2851);
process_write(pid, doublePar, 0);
console.assert(process_read(pid, doublePar) == 0);

console.log(process_read(pid, doubleArr));
process_write(pid, doubleArr, [2500.2851, 10.6, -1000.684]);
console.assert(process_read(pid,doubleArr) == [2500.2851, 10.6, -1000.684]);
process_write(pid, doubleArr, [0,0,0]);
console.assert(process_read(pid,doubleArr) == [0, 0, 0]);

console.log("testing singles\n");

console.log(process_read(pid, singlePar));
process_write(pid, singlePar, 2500.2851);
console.assert(process_read(pid, singlePar) == 2500.2851);
process_write(pid, singlePar, 0);
console.assert(process_read(pid, singlePar) == 0);

console.log(process_read(pid, singleArr));
process_write(pid, singleArr, [2500.2851, 10.6, -1000.684]);
console.log(process_read(pid, singleArr));
process_write(pid, singleArr, [0,0,0]);
console.log(process_read(pid, singleArr));

console.log("testing int32\n");

console.log(process_read(pid, int32Par));
process_write(pid, int32Par, 2500000);
console.assert(process_read(pid,int32Par) == 2500000);
process_write(pid, int32Par, -600000);
console.assert(process_read(pid,int32Par) == -600000);
process_write(pid, int32Par, 0);
console.assert(process_read(pid,int32Par) == 0);

console.log(process_read(pid, int32Arr));
process_write(pid, int32Arr, [2500000, 10, -1000000]);
console.assert(process_read(pid, int32Arr) == [2500000, 10, -1000000]);
process_write(pid, int32Arr, [0,0,0]);
console.assert(process_read(pid, int32Arr) == [0, 0, 0]);

console.log("testing uint32\n");

console.log(process_read(pid, uint32Par));
process_write(pid, uint32Par, 2500000);
console.log(process_read(pid, uint32Par));
process_write(pid, uint32Par, 0);
console.log(process_read(pid, uint32Par));

console.log(process_read(pid, uint32Arr));
process_write(pid, uint32Arr, [2500000, 10, 1000000]);
console.log(process_read(pid, uint32Arr));
process_write(pid, uint32Arr, [0,0,0]);
console.log(process_read(pid, uint32Arr));

console.log("testing int16\n");

console.log(process_read(pid, int16Par));
process_write(pid, int16Par, 25000);
console.log(process_read(pid, int16Par));
process_write(pid, int16Par, -6000);
console.log(process_read(pid, int16Par));
process_write(pid, int16Par, 0);
console.log(process_read(pid, int16Par));

console.log(process_read(pid, int16Arr));
process_write(pid, int16Arr, [25000, 10, -10000]);
console.log(process_read(pid, int16Arr));
process_write(pid, int16Arr, [0,0,0]);
console.log(process_read(pid, int16Arr));

console.log("testing uint16\n");

console.log(process_read(pid, uint16Par));
process_write(pid, uint16Par, 60000);
console.log(process_read(pid, uint16Par));
process_write(pid, uint16Par, 0);
console.log(process_read(pid, uint16Par));

console.log(process_read(pid, uint16Arr));
process_write(pid, uint16Arr, [25000, 10, 45000]);
console.log(process_read(pid, uint16Arr));
process_write(pid, uint16Arr, [0,0,0]);
console.log(process_read(pid, uint16Arr));

console.log("testing int8\n");

console.log(process_read(pid, int8Par));
process_write(pid, int8Par, 100);
console.log(process_read(pid, int8Par));
process_write(pid, int8Par, -98);
console.log(process_read(pid, int8Par));
process_write(pid, int8Par, 0);
console.log(process_read(pid, int8Par));

console.log(process_read(pid, int8Arr));
process_write(pid, int8Arr, [20, 10, -100]);
console.log(process_read(pid, int8Arr));
process_write(pid, int8Arr, [0,0,0]);
console.log(process_read(pid, int8Arr));

console.log("testing uint8\n");

console.log(process_read(pid, uint8Par));
process_write(pid, uint8Par, 200);
console.log(process_read(pid, uint8Par));
process_write(pid, uint8Par, 0);
console.log(process_read(pid, uint8Par));

console.log(process_read(pid, uint8Arr));
process_write(pid, uint8Arr, [250, 10, 45]);
console.log(process_read(pid, uint8Arr));
process_write(pid, uint8Arr, [0,0,0]);
console.log(process_read(pid, uint8Arr));

console.log("testing boolean\n");

console.log(process_read(pid, boolPar));
process_write(pid, boolPar, 200);
console.log(process_read(pid, boolPar));
process_write(pid, boolPar, 0);
console.log(process_read(pid, boolPar));

console.log(process_read(pid, boolArr));
process_write(pid, boolArr, [250, 10, 45]);
console.log(process_read(pid, boolArr));
process_write(pid, boolArr, [0,0,0]);
console.log(process_read(pid, boolArr));