const axios = require("axios");

const { requestForLoginPrompt, promptForOtp } = require("./prompt");

const requestForOtp = async (phoneNumber) => {
  const theUrl = `https://shopup.com.bd/v1/user/request-login-code`;
  const result = await axios.post(theUrl, {
    countryCode: "BD",
    callingCode: "+880",
    phoneNumber: phoneNumber,
    service: "redx",
  });
  if (result.data.error) {
    return {
      valid: false,
    };
  }
  return {
    valid: true,
    message: result.data.body.messages,
  };
};

const validateOtp = async (phone, loginCode) => {
  const theUrl = `https://shopup.com.bd/v1/user/login-with-code`;
  const result = await axios.post(theUrl, {
    loginCode,
    phone,
  });

  if (!result.data.error) {
    return result.data.body;
  }
  return null;
};

const initLogin = async () => {
  const phoneNumber = await requestForLoginPrompt();
  if (!phoneNumber) throw new Error("Phone Number Error");
  const result = await requestForOtp(phoneNumber);
  if (!result.valid) throw new Error("Sorry error found to sent otp");
  const otp = await promptForOtp();
  if (!otp) throw new Error("OTP not entered");
  const res = await validateOtp(phoneNumber, otp);
  return res;
};

module.exports = {
  requestForOtp,
  validateOtp,
  initLogin,
};
