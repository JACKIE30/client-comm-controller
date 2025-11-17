const Razorpay = require("razorpay");

const rzp = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET
});

async function createPaymentLink(amount) {
  return rzp.paymentLink.create({
    amount: amount * 100,
    currency: "INR",
    accept_partial: false
  });
}

module.exports = { createPaymentLink };
