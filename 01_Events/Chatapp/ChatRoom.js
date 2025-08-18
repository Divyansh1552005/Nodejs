const EventEmitter = require("node:events");

class ChatRoom extends EventEmitter{
    constructor(){
        super();
        // users will also only contain active users
        this.users = new Set(); // Set only keeps unique values
    }

    join(user){
        // this user has joind the chat, thats why we add it to the set, now we also gotta emit an event that this.user has joind the chat
        this.users.add(user);
        this.emit('join' , user); 
    }

    sendMessage(user, msg){
        // if user is an active user only then they can send msg. by active we mean someone authenticated 
        if(this.users.has(user) ){
            this.emit('sendmsg', user, msg)
        }
        else{
            console.log(`${user} is not in chat`)
        }   
    }

    leave(user){
        if(this.users.has(user)){
            this.users.delete(user);
            this.emit('leave', user)
        }
        else{
            console.log(`${user} is not in the chat`)
        }
    }
}


module.exports = ChatRoom; // so we can use it in driver code