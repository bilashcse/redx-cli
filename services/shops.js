const rp = require("request-promise");

const getAllShops = async (configs) => {
  const options = {
    uri: `https://shopup.com.bd/v1/shop?isRedX=true`,
    headers: {
      "x-access-token": `Bearer ${configs.accessToken}`,
    },
    json: true,
  };

  const result = await rp(options);
    return result && !result.isError ? result.body.shops.map(p => {
        return {
            ID: p.ID,
            SHOP_NAME: p.SHOP_NAME
        }
    }) : null;
};

module.exports = {
  getAllShops,
};
