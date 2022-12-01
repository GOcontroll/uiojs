const addon = require('../build/Release/uiojs-native');
const dataTypes = {
    uint8: 0,
    int8: 1,
    uint16: 2,
    int16: 3,
    uint32: 4,
    int32: 5,
    uint64: 6,
    int64: 7,
    single: 8,
    double: 9
};

class asap_element {

    dataSizes = [1,1,2,2,4,4,8,8,4,8]

    constructor(address, dataType, arraySize) {
        this.address = address;
        this.dataType = dataType
        this.size_element = this.dataSizes[dataType]
        this.size_t = this.dataSizes[dataType] * arraySize
    }
}

function chunk(data, chunkSize) {
    var R = [];
    for (var i = 0; i < data.length; i += chunkSize){
        var buff = Buffer.allocUnsafe(chunkSize);
        buff = data.slice(i, i + chunkSize);
        R.push(buff);
    }
    return R;
}

function convert_to_value(data, dataSize, dataType) {
    dataBlocks = chunk(data, dataSize);
    var array = [];
    switch (dataType) {
        case dataTypes.uint8:
            return data;
        case dataTypes.int8:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readInt8LE(0));
            }
            break;
        case dataTypes.uint16:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readUint16LE(0));
            }
            break;
        case dataTypes.int16:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readInt16LE(0));
            }
            break;
        case dataTypes.uint32:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readUint32LE(0));
            }
            break;
        case dataTypes.int32:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readInt32LE(0));
            }
            break;
        case dataTypes.uint64:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readBigUint64LE(0));
            }
            break;
        case dataTypes.int64:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readBigInt64LE(0));
            }
            break;
        case dataTypes.single:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readFloatLE(0));
            }
            break;
        case dataTypes.double:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readDoubleLE(0));
            }
            break;
    }
    return array;
}

function convert_to_bytes(data, dataSize, dataType) {
    array = Buffer.allocUnsafe(data.length * dataSize);
    if (!Array.isArray(data)) {
        data = [data]
    }
    switch (dataType) {
        case dataTypes.uint8:
            for (var i = 0; i < data.length; i++){
                array.writeUint8LE(data[i],i)
            }
            break;
        case dataTypes.int8:
            for (var i = 0; i < data.length; i++){
                array.writeInt8LE(data[i],i)
            }
            break;
        case dataTypes.uint16:
            for (var i = 0; i < data.length; i++){
                array.writeUint16LE(data[i],i*2)
            }
            break;
        case dataTypes.int16:
            for (var i = 0; i < data.length; i++){
                array.writeInt16LE(data[i],i*2)
            }
            break;
        case dataTypes.uint32:
            for (var i = 0; i < data.length; i++){
                array.writeUint32LE(data[i],i*4)
            }
            break;
        case dataTypes.int32:
            for (var i = 0; i < data.length; i++){
                array.writeInt32LE(data[i],i*4)
            }
            break;
        case dataTypes.uint64:
            for (var i = 0; i < data.length; i++){
                array.writeBigUint64LE(data[i],i*8)
            }
            break;
        case dataTypes.int64:
            for (var i = 0; i < data.length; i++){
                array.writeBigInt64LE(data[i],i*8)
            }
            break;
        case dataTypes.single:
            for (var i = 0; i < data.length; i++){
                array.writeFloatLE(data[i],i*4)
            }
            break;
        case dataTypes.double:
            for (var i = 0; i < data.length; i++){
                array.writeDoubleLE(data[i],i*8)
            }
            break;
    }
    return array
}

function process_read(pid, asap_ele) {
    array = Buffer.alloc(asap_ele.size_t);
    result = addon._process_read(pid, asap_ele.address, array, asap_ele.size_t);
    if (result < 0) {
        throw "process_read failed " + result;
    }
    return convert_to_value(array, asap_ele.size_element, asap_ele.dataType);
}

function process_write(pid, asap_ele, data) {
    buffer = convert_to_bytes(data, asap_ele.dataSize, asap_ele.dataType);
    result = addon._process_write(pid, asap_ele.address, buffer, asap_ele.size_t);
    if (result < 0) {
        throw "process_write failed " + result;
    }
}

module.exports.process_read = process_read;
module.exports.process_write = process_write;
module.exports.asap_element = asap_element;
module.exports.dataTypes = dataTypes;
// module.exports.uint8 = this.uint8;
// module.exports.int8 = this.int8;
// module.exports.uint16 = this.uint16;
// module.exports.int16 = this.int16;
// module.exports.uint32 = this.uint32;
// module.exports.int32 = this.int32;
// module.exports.uint64 = this.uint64;
// module.exports.int64 = this.int64;
// module.exports.single = this.single;
// module.exports.double = this.double;