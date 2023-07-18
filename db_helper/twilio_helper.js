const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = (phone, message, onSuccess) => {
  try {
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+91".concat(phone),
      },function(error, data){onSuccess(error, data)});
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendSms };
