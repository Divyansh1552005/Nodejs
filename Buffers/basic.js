// ❌ JavaScript does not have a "binary data type"
// It only has Numbers (floating point), Strings, Arrays, Objects

let str = "ABC"; 

// JS can only give character codes (Unicode/ASCII)
console.log("Char codes from JS strings:");
console.log("A:", str.charCodeAt(0)); // 65
console.log("B:", str.charCodeAt(1)); // 66
console.log("C:", str.charCodeAt(2)); // 67

// But we CANNOT directly store binary values like 01000001 (for 'A')
// JavaScript will treat 01000001 as a normal number (in decimal = 1000001)
// let binaryA = 01000001; 
console.log("binaryA interpreted as decimal:", binaryA); // 1000001

// So JS alone cannot properly store raw binary data like files or network packets.


// ✅ Using Buffers we can directly store raw binary values

// ASCII Binary Values:
// A = 65 → 01000001
// B = 66 → 01000010
// C = 67 → 01000011

let buf = Buffer.from([0b01000001, 0b01000010, 0b01000011]); // binary literals

console.log("Raw Buffer (in hex form):", buf); 
// Node prints <Buffer 41 42 43> → (41=65='A', 42=66='B', 43=67='C')

console.log("As String:", buf.toString()); // "ABC"

// Access and display bytes in binary form
console.log("First byte in binary:", buf[0].toString(2).padStart(8, "0"));  // 01000001
console.log("Second byte in binary:", buf[1].toString(2).padStart(8, "0")); // 01000010
console.log("Third byte in binary:", buf[2].toString(2).padStart(8, "0"));  // 01000011