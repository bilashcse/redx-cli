const axios = require("axios");

const getAllShops = async (configs) => {
  const url = `https://shopup.com.bd/v1/shop?isRedX=true`;
  const result = await axios.get(url, {
    "x-access-token": `Bearer ${configs.accessToken}`,
  });

  console.log(result.data);
  if (!result.data.isError) {
    console.log(result.data.body);
    return result.data.body;
  }
  return null;
};

module.exports = {
  getAllShops,
};
