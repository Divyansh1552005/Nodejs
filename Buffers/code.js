import { Buffer } from 'node:buffer';

// // Creates a zero-filled Buffer of length 10.
// const buf1 = Buffer.alloc(10);
// let k = 1;

// for (let i = 0; i < buf1.length; i++) {
//     buf1[i] = i * k;
//     k = k + 3;
// }

// console.log(buf1)


// // Creates a Buffer of length 10,
// // filled with bytes which all have the value `1`.
// const buf2 = Buffer.alloc(10, 1);

// // Creates an uninitialized buffer of length 10.
// // This is faster than calling Buffer.alloc() but the returned
// // Buffer instance might contain old data that needs to be
// // overwritten using fill(), write(), or other functions that fill the Buffer's
// // contents.
// const buf3 = Buffer.allocUnsafe(10);
// console.log("Uninitialized Buffer:", buf3); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// // Creates a Buffer containing the bytes [1, 2, 3].
// const buf4 = Buffer.from([1, 2, 3]);
// console.log("Buffer from array:", buf4); // <Buffer 01 02 03>


// // Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
// // are all truncated using `(value & 255)` to fit into the range 0–255.
// const buf5 = Buffer.from([257, 257.5, -255, '1']);

// // Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
// // [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
// // [116, 195, 169, 115, 116] (in decimal notation)
// const buf6 = Buffer.from('tést');
// console.log("Buffer from string:", buf6); // <Buffer 74 c3 a9 73 74>

// // Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
// const buf7 = Buffer.from('tést', 'latin1');



const buf_str = Buffer.from("Divyansh1552005", 'utf-8');
console.log("Buffer from string:", buf_str);

let info = buf_str.toString();
console.log("String from Buffer:", info);
