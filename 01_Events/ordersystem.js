const EventEmitter = require('events');

class OrderSystem extends EventEmitter {
  placeOrder(orderId) {
    console.log(`✅ Order #${orderId} placed`);
    this.emit('orderPlaced', orderId);
  }
}

// Create object
const shop = new OrderSystem();

// Listener functions
function payment(orderId) {
  console.log(`💳 Processing payment for order #${orderId}`);
}
function invoice(orderId) {
  console.log(`🧾 Generating invoice for order #${orderId}`);
}
function email(orderId) {
  console.log(`📧 Sending confirmation email for order #${orderId}`);
}

// 1️⃣ Add listeners
shop.on('orderPlaced', payment);
shop.on('orderPlaced', invoice);
shop.once('orderPlaced', email);  // runs only once

// 2️⃣ Check listeners list
console.log("Listeners for orderPlaced:", shop.listeners('orderPlaced'));

// 3️⃣ Emit event first time
shop.placeOrder(101);

// 4️⃣ Remove specific listener (invoice)
shop.removeListener('orderPlaced', invoice);

// 5️⃣ Emit event second time
shop.placeOrder(102);

// 6️⃣ Remove ALL listeners
shop.removeAllListeners('orderPlaced');

// 7️⃣ Emit again → no listener runs
shop.placeOrder(103);
