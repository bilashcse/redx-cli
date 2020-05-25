const inquirer = require("inquirer");

const requestForLoginPrompt = async () => {
  const answer = await inquirer.prompt({
    name: "phone",
    type: "input",
    message: "Please enter your registered Phone Number: ",
  });

  if (answer.phone.length) {
    const number = /(\d){10}$/.exec(answer.phone.toString());
    return number[0];
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

const prompedSelectShop = async (shops) => {
  const shopNames = shops.map((p) => p.SHOP_NAME);
  const answer = await inquirer.prompt({
    name: "shop",
    type: "list",
    message: "Please select shop: ",
    choices: shopNames,
  });
  if (answer.shop.length) {
    return answer.shop;
  }
  return null;
};

const visibleRedXRecursively = async (configs) => {
  const lists = ["Dashboard", "Parcels", "Payments", "Exit"];
  const answer = await inquirer.prompt({
    name: "option",
    type: "list",
    message: "Please select option: ",
    choices: lists,
  });

  if (answer.option.length) {
    return answer.option;
  }
  return null;
};

module.exports = {
  requestForLoginPrompt,
  prompedSelectShop,
  promptForOtp,
  visibleRedXRecursively,
};
