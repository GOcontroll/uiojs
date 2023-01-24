# uiojs
A node addon for making Userspace IO on Linux accessible by javascript.

Currently implements process_vm_readv and process_vm_writev from sys/uio. \
https://man7.org/linux/man-pages/man2/process_vm_readv.2.html

## testing

due to the nature of this addon it is beyond my capabilities to automatically test it, but it does work, at least on my arm v8 system (IMX8MM) running kernel 5.15.32 and debian 11.

int64 and uint64 have not been tested yet, I have no use for them at this point, but if one experiences problems with them head over to the issues tab: \
https://github.com/GOcontroll/uiojs/issues

## installing
```
"dependencies": {
    "uiojs": "1.0.6"
},
```
include the dependency in your package.json and npm install

or download the source and install it manually from the source

## usage
```
import { dataTypes, asap_element, process_read, process_write } from "uiojs";

let address = 0x422540;                  //the memory address to read from
let dataType = dataTypes.uint16;         //the value to read is an unsigned 16 bit integer
let arraySize = 1;                       //it is a single value and not an array

asap_dutycycle = new asap_element(address, dataType, arraySize);

pid = 2842;   //automate looking up the pid of the process you would like to influence, this is just a simple example

let dutycycle = process_read(pid, asap_dutycycle);
// do some work
let new_dutycycle = 900
process_write(pid, asap_dutycycle, new_dutycycle);

//process_read(pid, asap_dutycycle) == 900 now
```

these functions are also methods of the asap_element class:

```
let dutycycle = asap_dutycycle.process_read(pid)
asap_dutycycle.process_write(pid, new_dutycycle)
```

The regular process_read and process_write might be deprecated or altered to serve a more generic purpose at some point.