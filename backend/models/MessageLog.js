const mongoose=require('mongoose');
const MessageLogSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  providerMessageId: String,
  direction: String,
  body: String,
  status: String,
  providerEvent: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('MessageLog', MessageLogSchema);

