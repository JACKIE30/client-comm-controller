const express = require("express");
const Tenant = require("../models/Tenant");
const Conversation = require("../models/Conversation");
const MessageLog = require("../models/MessageLog");
const { postToCliqChannel } = require("../utils/cliqAPI");

const router = express.Router();

// Gupshup inbound
router.post("/gupshup", async (req, res) => {
  try {
    const data = req.body;

    const phone = data?.sender?.phone;
    const message = data?.message?.text;

    const tenant = await Tenant.findOne();

    let conv = await Conversation.findOne({ phone });
    if (!conv) conv = await Conversation.create({ phone, messages: [] });

    conv.messages.push({ from: "customer", text: message });
    await conv.save();

    await MessageLog.create({
      tenantId: tenant._id,
      direction: "in",
      message,
      providerEvent: data
    });

    await postToCliqChannel(
      tenant,
      tenant.defaultChannel,
      { text: `WA from ${phone}: ${message}` }
    );

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(200);
  }
});

module.exports = router;
