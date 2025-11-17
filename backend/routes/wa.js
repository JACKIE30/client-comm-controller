const express = require("express");
const Tenant = require("../models/Tenant");
const Conversation = require("../models/Conversation");
const { sendText } = require("../utils/gupshupclient");
const { createPaymentLink } = require("../utils/razorpayClient");
const { postToCliqChannel } = require("../utils/cliqAPI");

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { to, text } = req.body;
    const tenant = await Tenant.findOne();

    await sendText(tenant.gupshup.apiKey, tenant.gupshup.number, to, text);

    await postToCliqChannel(
      tenant,
      tenant.defaultChannel,
      { text: `Sent to ${to}: ${text}` }
    );

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/send-link", async (req, res) => {
  const { to, amount } = req.body;
  const tenant = await Tenant.findOne();

  const link = await createPaymentLink(amount);
  const shortUrl = link.short_url;

  await sendText(
    tenant.gupshup.apiKey,
    tenant.gupshup.number,
    to,
    `Pay here: ${shortUrl}`
  );

  await postToCliqChannel(
    tenant,
    tenant.defaultChannel,
    { text: `Payment link sent to ${to}: ${shortUrl}` }
  );

  res.json({ ok: true, shortUrl });
});

module.exports = router;
