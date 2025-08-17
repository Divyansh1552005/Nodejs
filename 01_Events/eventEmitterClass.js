const EventEmitter = require('node:events')

class Chat extends EventEmitter {
  constructor() {
    super();
  }

  sendMessage(msg){
    console.log(`Sending message: ${msg}`);
    this.emit('msgRec', msg);
  }
}

const chat = new Chat();

chat.on('msgRec', (msg) => {
  console.log(`New message: ${msg}`);
});

chat.sendMessage('Hello, world!');


