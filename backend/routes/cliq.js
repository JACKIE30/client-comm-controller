const express = require("express");
const Tenant = require("../models/Tenant");
const Conversation = require("../models/Conversation");
const { sendText } = require("../utils/gupshupclient");
const { postToCliqChannel } = require("../utils/cliqAPI");

const router = express.Router();

router.post("/command", async (req, res) => {
  try {
    const payload = req.body;
    const cmd = payload.text;

    const tenant = await Tenant.findOne();

    // Example: send <number> "message"
    const m = cmd.match(/^send\s+(\d+)\s+"(.+)"$/i);

    if (!m)
      return res.json({ text: 'Format: send <number> "message"' });

    const number = m[1];
    const message = m[2];

    await sendText(
      tenant.gupshup.apiKey,
      tenant.gupshup.number,
      number,
      message
    );

    await postToCliqChannel(
      tenant,
      tenant.defaultChannel,
      { text: `Message sent to ${number}` }
    );

    res.json({ text: "Delivered." });
  } catch (e) {
    console.error(e);
    res.json({ text: "Error: " + e.message });
  }
});

module.exports = router;
