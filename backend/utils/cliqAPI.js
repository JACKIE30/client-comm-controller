const axios = require("axios");

// send to channel
async function postToCliqChannel(tenant, channelName, body) {
  const webhookUrl = tenant?.incomingWebhooks?.[channelName];

  // 1) Prefer Incoming Webhook (no OAuth needed)
  if (webhookUrl) {
    return axios.post(webhookUrl, { text: body.text });
  }

  // 2) If bot token exists → use Bot API
  if (tenant.botAccessToken) {
    const url = `https://cliq.zoho.com/api/v2/channelsbyname/${channelName}/message`;
    return axios.post(url, body, {
      headers: {
        Authorization: `Zoho-oauthtoken ${tenant.botAccessToken}`
      }
    });
  }

  throw new Error("No webhook or bot token available");
}

// DM user
async function postToCliqUser(tenant, userId, body) {
  if (tenant.botAccessToken) {
    const url = `https://cliq.zoho.com/api/v2/users/${userId}/message`;
    return axios.post(url, body, {
      headers: {
        Authorization: `Zoho-oauthtoken ${tenant.botAccessToken}`
      }
    });
  }

  // fallback → post to default channel as @mention
  return postToCliqChannel(
    tenant,
    process.env.DEFAULT_CHANNEL,
    { text: `@${userId} ${body.text}` }
  );
}

module.exports = { postToCliqChannel, postToCliqUser };
