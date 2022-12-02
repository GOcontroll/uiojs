# uiojs
A node addon for making Userspace IO on Linux accessible by javascript.

Currently implements process_vm_readv and process_vm_writev from sys/uio. \
https://man7.org/linux/man-pages/man2/process_vm_readv.2.html

# testing

due to the nature of this addon it is beyond my capabilities to automatically test it, but it does work, at least on my arm v8 system (IMX8MM) running kernel 5.15.32 and debian 11.

int64 and uint64 have not been tested yet, I have no use for them at this point, but if one experiences problems with them head over to the issues tab: \
https://github.com/GOcontroll/uiojs/issues

test results:

testing doubles

read current double = [ 0 ]
write 2500.2851
read current double = [ 2500.2851 ]
write 0
read current double = [ 0 ]

read current double array = [ 0, 0, 0 ]
write [ 2500.2851, 10.6, -1000.684 ]
read current double array = [ 2500.2851, 10.6, -1000.684 ]
write [ 0, 0, 0 ]
read current double array = [ 0, 0, 0 ]

testing singles

read current single = [ 0 ]
write 2500.2851
read current single = [ 2500.28515625 ]
write 0
read current single = [ 0 ]

read current single array = [ 0, 0, 0 ]
write [ 2500.2851, 10.6, -1000.684]
read current single array = [ 2500.28515625, 10.600000381469727, -1000.6840209960938 ]
write [ 0, 0, 0 ]
read current single array = [ 0, 0, 0 ]

testing int32

read current value = [ 0 ]
write 2500000
read current value = [ 2500000 ]
write  -600000
read current value = [ -600000 ]
write 0
read current value = [ 0 ]

read arr = [ 0, 0, 0 ]
write [ 2500000, 10, -1000000 ]
read arr = [ 2500000, 10, -1000000 ]
write [ 0, 0, 0 ]
read arr = [ 0, 0, 0 ]

and so on... see test/test_binding.js for the test program

testing uint32

[ 0 ]
[ 2500000 ]
[ 0 ]

[ 0, 0, 0 ]
[ 2500000, 10, 1000000 ]
[ 0, 0, 0 ]

testing int16

[ 0 ]
[ 25000 ]
[ -6000 ]
[ 0 ]

[ 0, 0, 0 ]
[ 25000, 10, -10000 ]
[ 0, 0, 0 ]

testing uint16

[ 0 ]
[ 60000 ]
[ 0 ]

[ 0, 0, 0 ]
[ 25000, 10, 45000 ]
[ 0, 0, 0 ]

testing int8

[ 0 ]
[ 100 ]
[ -98 ]
[ 0 ]

[ 0, 0, 0 ]
[ 20, 10, -100 ]
[ 0, 0, 0 ]

testing uint8

[ 0 ]
[ 200 ]
[ 0 ]

[ 0, 0, 0 ]
[ 250, 10, 45 ]
[ 0, 0, 0 ]