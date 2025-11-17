const mongoose=require('mongoose');
const MessageSchema = new mongoose.Schema({
  from: String,
  text: String,
  media: Object,
  ts: { type: Date, default: Date.now }
});
const ConversationSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  phone: String,
  name: String,
  crmId: String,
  messages: [MessageSchema],
  status: { type: String, default: 'open' },
  assignedAgent: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
module.exports=mongoose.model('Conversation', ConversationSchema);
