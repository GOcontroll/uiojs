const addon = require('../build/Release/uiojs-native');

/**
 * Object containing all the accepted datatypes.
 */
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

/**
 * Class that holds information about a certain variable that is to be accessed
 * @property {int} address An integer containing the starting memory address of the information to access.
 * @property {int} dataType An integer containing the datatype of the memory that is accessed.
 * @property {int} size_element An integer containing the size of a single element of dataType in bytes.
 * @property {int} size_t An integer containing the complete size of the memory area to access in bytes.
 */
class asap_element {
    
    dataSizes = [1,1,2,2,4,4,8,8,4,8]

    /**
     * @constructs asap_element
     * @param {int} address An integer containing the starting memory address of the information to access.
     * @param {int} dataType An integer containing the datatype of the memory that is accessed, use the dataTypes object for this value.
     * @param {int} arraySize The size of the array to read of dataType, if it is a simple variable and not an array this field is optional.
     */
    constructor(address, dataType, arraySize=1) {
        this.address = address;
        this.dataType = dataType
        this.size_element = this.dataSizes[dataType]
        this.size_t = this.size_element * arraySize
    }

    /**
     * Read from process with id pid, with the information present in the asap_element class.\
     * If return_bytes is set to true, it returns the raw buffer of bytes instead of a converted value.
     * @param {int} pid                 The process ID to read from.
     * @param {boolean} return_bytes    Optional setting to return raw bytes instead of a converted value.
     * @returns {int|float|[int]|[float]|Buffer} the value that was present at the given memory address.
     * 
     * @throws An error if the memory read failed, gives the errno that caused it.\
     * To check the error see:
     * @link  https://man7.org/linux/man-pages/man2/process_vm_readv.2.html
     */
    process_read(pid, return_bytes=false) {
        let array = Buffer.allocUnsafe(this.size_t);
        let result = addon._process_read(pid, this.address, array, this.size_t);
        if (result < 0) {
            throw "process_read failed " + result;
        }
        if (return_bytes) {return array}
        return convert_to_value(array, this.size_element, this.dataType);
    }

    /**
     * Write to process with id pid, with the information present in the asap_element class.
     * @param {int} pid                         The process ID to write to.
     * @param {int|float|[int]|[float]} data    The data to write to the process
     * 
     * @throws An error if the memory write failed, gives the errno that caused it.\
     * To check the error see:
     * @link  https://man7.org/linux/man-pages/man2/process_vm_readv.2.html
     */
    process_write(pid, data) {
        let buffer = convert_to_bytes(data, this.size_element, this.dataType);
        let result = addon._process_write(pid, this.address, buffer, this.size_t);
        if (result < 0) {
            throw "process_write failed " + result;
        }
    }
}

/**
 * Cuts a buffer into equal sections of size chunkSize.
 * @param {Buffer} data     The buffer to cut.
 * @param {int} chunkSize   The size of the chunks to cut it in.
 * @returns {[[]]}         An array filled with the chunks.
 */
function chunk(data, chunkSize) {
    var R = [];
    for (var i = 0; i < data.length; i += chunkSize){
        var buff = Buffer.allocUnsafe(chunkSize);
        buff = data.slice(i, i + chunkSize);
        R.push(buff);
    }
    return R;
}

/**
 * Converts a byte buffer into a useable format.
 * @param {Buffer} data     The byte buffer to convert.
 * @param {int} dataSize    The data size of dataType.
 * @param {int} dataType    The datatype the buffer needs to be converted to.
 * @returns {int|float|[int]|[float]} Returns a usable version of the values in the byte buffer.
 */
function convert_to_value(data, dataSize, dataType) {
    let dataBlocks = chunk(data, dataSize);
    var array = [];
    switch (dataType) {
        case dataTypes.uint8:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readUint8(0));
            }
            break;
        case dataTypes.int8:
            for (var i = 0; i < dataBlocks.length; i++) {
                array.push(dataBlocks[i].readInt8(0));
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
    if (array.length == 1){
        return array[0];
    }
    return array;
}

/**
 * Converts a value or an array of values to their representation in bytes.
 * @param {int|float|[int]|[float]} data    The data to convert to bytes.
 * @param {int} dataSize                    The size of the datatype.
 * @param {int} dataType                    The datatype of data.
 * @returns {Buffer}                        A byte buffer containing the converted inputs.
 */
function convert_to_bytes(data, dataSize, dataType) {
    if (!Array.isArray(data)) {
        data = [data]
    }
    let array = Buffer.allocUnsafe(data.length * dataSize);
    switch (dataType) {
        case dataTypes.uint8:
            for (var i = 0; i < data.length; i++){
                array.writeUint8(data[i],i)
            }
            break;
        case dataTypes.int8:
            for (var i = 0; i < data.length; i++){
                array.writeInt8(data[i],i)
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

/**
 * Read from process with id pid, with the information present in the asap_element class.\
 * If return_bytes is set to true, it returns the raw buffer of bytes instead of a converted value.
 * @param {int} pid                 The process ID to read from.
 * @param {asap_element} asap_ele   The asap_element containing information about the memory to read.
 * @param {boolean} return_bytes    Optional setting to return raw bytes instead of a converted value.
 * @returns {int|float|[int]|[float]|Buffer} the value that was present at the given memory address.
 * 
 * @throws An error if the memory read failed, gives the errno that caused it.\
 * To check the error see:
 * @link  https://man7.org/linux/man-pages/man2/process_vm_readv.2.html
 */
function process_read(pid, asap_ele, return_bytes=false) {
    let array = Buffer.allocUnsafe(asap_ele.size_t);
    let result = addon._process_read(pid, asap_ele.address, array, asap_ele.size_t);
    if (result < 0) {
        throw "process_read failed " + result;
    }
    if (return_bytes) {return array}
    return convert_to_value(array, asap_ele.size_element, asap_ele.dataType);
}

/**
 * Write to process with id pid, with the information present in the asap_element class.
 * @param {int} pid                         The process ID to write to.
 * @param {asap_element} asap_ele           The asap_element containing information about the memory to read.
 * @param {int|float|[int]|[float]} data    The data to write to the process
 * 
 * @throws An error if the memory write failed, gives the errno that caused it.\
 * To check the error see:
 * @link  https://man7.org/linux/man-pages/man2/process_vm_readv.2.html
 */
function process_write(pid, asap_ele, data) {
    let buffer = convert_to_bytes(data, asap_ele.size_element, asap_ele.dataType);
    let result = addon._process_write(pid, asap_ele.address, buffer, asap_ele.size_t);
    if (result < 0) {
        throw "process_write failed " + result;
    }
}

module.exports.process_read = process_read;
module.exports.process_write = process_write;
module.exports.asap_element = asap_element;
module.exports.dataTypes = dataTypes;