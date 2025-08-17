const ChatRoom = require("./ChatRoom")

const chat = new ChatRoom();

function join_listener(user){
    console.log(`${user} has joined the chatroom!`)
}
chat.on('join', join_listener);


function sendmsg_listener(user, msg){
    console.log(`${user} : ${msg}`)
}
chat.on('sendmsg', sendmsg_listener);


function leave_listener(user){
    console.log(`${user} has left the chatroom!`)
}
chat.on('leave', leave_listener);


// simulating the chat
chat.join('Satbir')
chat.join('Ramfal')

chat.sendMessage("Satbir", "hello to everyone")

chat.leave("Ramfal")

chat.sendMessage("Ramfal", "Oke")


