#! /usr/bin/env node
const inquirer = require("inquirer");

const { initLogin } = require("./services/login");
const { getAllShops } = require("./services/shops");
const { prompedSelectShop } = require("./services/prompt");
const { initDashboard } = require("./services/dashboard");
let configs = {};
const run = async () => {
  try {
    configs = await initLogin();
    if (!configs) throw new Error("Sorry, cant verify. Try again later.");
    console.log("Congrats! you are successfully login to RedX");
    const shops = await getAllShops(configs);
    const selectedShopName = await prompedSelectShop(shops);
    configs.selectedShopId = shops.find(
      (shop) => shop.SHOP_NAME === selectedShopName
    ).ID;
    await initDashboard(configs);
  } catch (err) {
    console.error(err);
  }
};

run();
