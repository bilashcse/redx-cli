const inquirer = require("inquirer");

const { initLogin } = require("./services/login");
const { getAllShops } = require("./services/shops");

// let configss = {};
const configs = {"user":{"BIRTH_YEAR":null,"ID":2263,"FACEBOOK_ID":"10205879231410504","MESSENGER_ID":"1396830583660483","FULL_NAME":"Nazmul Hossain Bilash","COUNTRY_PHONE_CODE":"+880","PHONE_NUMBER":"8801717346500","ADDRESS":"37/C/3, Chalantika Housing, Mirpur 1","DATE_OF_BIRTH":null,"OVER_18":null,"GENDER":null,"LANDMARK":"Dhaka","SOURCE_APP":null,"REFERRAL_SOURCE":null,"AREA_ID":315,"AREA":"Mirpur","ZONE":null,"CITY":"Dhaka","COUNTRY_CODE":"BD","COUNTRY":"BANGLADESH","POST_CODE":null,"STATE":null,"GOOGLE_ADDRESS":null,"EMAIL":"bilashcse@gmail.com","PROFILE_PIC":"https://scontent.xx.fbcdn.net/v/t31.0-1/p720x720/26758714_10210437636847791_5531070104088024612_o.jpg?oh=d58c5569b519ac7aa50d3b137a85fe5b&oe=5B486B4E","IS_SUPERVISOR":false,"IS_RESELLER":true,"RESELLER_CODE":null,"SUPERVISOR_ID":null,"STATUS":"active","RATING_COUNT":7,"RATING":5,"Roles":[{"id":3,"name":"Software Engineer"}],"FRESHCHAT_RESTORE_ID":null},"accessToken":"94fe90c3fcaa67eee60eabf6c553554062cd3d6368c2ae219d04cf987215a706de8e4f2b0732162d840e8da88741e612df297a491afd3e64909a0143bcc4e218"}

const run = async () => {
  try {
    //   configs = await initLogin();
    //   if (!configs) throw new Error('Sorry, cant verify. Try again later.');
    //   console.log("Congrats! you are successfully login to RedX");
    const shops = await getAllShops(configs);
  } catch (err) {
    console.error(err);
  }
};

run();
