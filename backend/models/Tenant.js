const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  orgName: String,

  incomingWebhooks: {
    type: Object, default: {} // e.g. { general: 'https://incoming...' }
  },

  botAccessToken: String,

  gupshup: {
    apiKey: String,
    number: String
  },

  razorpay: {
    key_id: String,
    key_secret: String
  },

  createdAt: { type: Date, default: Date.now },
  defaultChannel: { type: String, default: "general" },
});

module.exports = mongoose.model("Tenant", TenantSchema);
