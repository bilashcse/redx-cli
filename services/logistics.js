const rp = require("request-promise");
const moment = require("moment");

const getLogisticsSummary = async (configs) => {
  const shopId = configs.selectedShopId;
  const from = moment().subtract(1, "months").valueOf();
  const to = moment().valueOf();
  const options = {
    uri: `https://shopup.com.bd/v1/admin/shop/${shopId}/logistics/dashboard/overview?since=${from}&until=${to}`,
    headers: {
      "x-access-token": `Bearer ${configs.accessToken}`,
    },
    json: true,
  };

  const result = await rp(options);
  return result && !result.isError ? result.body : null;
};

const getLogisticsPayments = async (configs) => {
  const shopId = configs.selectedShopId;
  const limit = 20;
  const options = {
    uri: `https://api.redx.com.bd/v1/admin/shop/${shopId}/logistics/invoice?limit=${limit}&offset=0&sort=0`,
    headers: {
      "x-access-token": `Bearer ${configs.accessToken}`,
    },
    json: true,
  };

  const result = await rp(options);
  return result && !result.isError ? result.body.invoices : null;
};

const getLogisticsParcels = async (configs) => {
  const shopId = configs.selectedShopId;
  const limit = 20;
  const options = {
    uri: `https://api.redx.com.bd/v1/admin/shop/${shopId}/logistics/parcels?limit=${limit}&page=1&offset=0&sort=0`,
    headers: {
      "x-access-token": `Bearer ${configs.accessToken}`,
    },
    json: true,
  };
  
  const result = await rp(options);
  return result && !result.isError ? result.body.parcels : null;
};


module.exports = {
  getLogisticsSummary,
  getLogisticsPayments,
  getLogisticsParcels
};
