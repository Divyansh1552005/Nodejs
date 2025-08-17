const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener function
function greet(name) {
  console.log(`Hello, ${name}!`);
}

// Attach listener
myEmitter.on('greet', greet);

// Emit event → listener chalega
myEmitter.emit('greet', 'Divyansh');

// Remove that specific listener
myEmitter.removeListener('greet', greet);

// Emit again → ab kuch nahi hoga
myEmitter.emit('greet', 'Divyansh');