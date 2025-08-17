const EventEmitter = require('node:events')

const myEmitter = new EventEmitter();

const listener_func = (name = "DS")=>{
    console.log(`hi ${name}`)
}

myEmitter.on("greet", listener_func);
myEmitter.on("yeo", listener_func);
myEmitter.on("yeo", ()=>{
    console.log("Message sent");
});

myEmitter.on("dab", ()=>{
    console.log("whats up my G")
})

myEmitter.emit("greet", "Divyansh")
myEmitter.emit("dab");
myEmitter.emit("yeo");

console.log(myEmitter.listeners("yeo"))
