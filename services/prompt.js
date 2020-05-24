const inquirer = require("inquirer");

const requestForLoginPrompt = async () => {
  const answer = await inquirer.prompt({
    name: "phone",
    type: "input",
    message: "Please enter your registered Phone Number: ",
  });

  if (answer.phone.length) {
    return answer.phone;
  }
  return null;
};

const promptForOtp = async () => {
  const answer = await inquirer.prompt({
    name: "otp",
    type: "input",
    message: "Please enter your OTP: ",
  });

  if (answer.otp.length) {
    return answer.otp;
  }
  return null;
};

module.exports = {
  requestForLoginPrompt,
  promptForOtp,
};