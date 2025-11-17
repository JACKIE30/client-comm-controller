
const axios = require('axios');
const dotenv=require('dotenv');
dotenv.config();
const API = "https://api.gupshup.io/sm/api/v1/msg";
const apiKey = process.env.GUPSHUP_APIKEY;

async function sendText(apiKey, source, to, text) {
  const payload = new URLSearchParams({
    channel: "whatsapp",
    source,
    destination: to,
    message: JSON.stringify({ type: "text", text })
  });

  return axios.post(API, payload.toString(), {
    headers: {
      apikey: apiKey,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

module.exports = { sendText };
