const moment = require("moment");
const { table } = require("table");
const {
  getLogisticsSummary,
  getLogisticsParcels,
  getLogisticsPayments,
} = require("./logistics");
const { visibleRedXRecursively } = require("./prompt");

const manageLogisticsDashboardSummary = async (configs) => {
  process.stdout.write("\033c");
  const summary = await getLogisticsSummary(configs);
  console.log("\n*****************");
  console.log("Dashboard");
  console.log("*****************");
  let data = [];
  data.push([
    `Order Placed: ${summary.totalOrders}`,
    `Order Delivered: ${summary.totalDelivered}`,
    `Orders In Transit: ${summary.totalInTransit}`,
  ]);

  data.push([
    `Orders Returned: ${summary.totalOrdersReturned}`,
    `Successful Deliveries: ${summary.successfulDeliveryPercentage}%`,
    `Orders To be Returned: ${summary.totalOrdersToBeReturned}`,
  ]);

  data.push([
    `Total Sales: ${summary.totalSales}`,
    `Total Delivery Fees Paid: ${summary.totalFeesPaid}`,
    `Payment Processing: ${summary.totalPaymentProcessingAmount}`,
  ]);

  const output = table(data);
  console.log(output);
};

const manageLogisticsParcels = async (configs) => {
  process.stdout.write("\033c");
  const parcels = await getLogisticsParcels(configs);
  console.log("\n*****************");
  console.log("Parcels");
  console.log("*****************");
  let data = [];
  data.push(["Parcels Info", "Customer Info", "Payment Info", "Status"]);
  parcels.forEach((p) => {
    let status = "Unpaid";
    if (p.IS_SETTLED) status = "Paid";
    data.push([
      `TrackingId: ${p.ID}\nCreated: ${moment(p.CREATED_AT).format(
        "DD MMM, YYYY"
      )}`,
      `Customer Name: ${(p.CUSTOMER_NAME).trim()}\nPhone: ${p.CUSTOMER_PHONE}\nArea: ${p.AREA}`,
      `Cash Collection: ${p.CASH}\nDelivery Charge: ${p.SHOPUP_CHARGE}`,
      `Status: ${p.SELLER_STATUS}\nPayment Status: ${status}`,
    ]);
  });

  const output = table(data);
  console.log(output);
};

const manageLogisticsPayments = async (configs) => {
  process.stdout.write("\033c");
  const payments = await getLogisticsPayments(configs);
  console.log("\n*****************");
  console.log("Payments");
  console.log("*****************");

  let data = [];
  data.push(["Invoice", "Cash Details", "Paid Amount", "Payment Status"]);
  
    payments.forEach((p) => {
    let status = "Unpaid";
    const cashCollection =
      p.AMOUNT +
      p.TOTAL_SHOPUP_CHARGE +
      p.TOTAL_COD_CHARGE +
      p.TOTAL_RETURN_CHARGE;
    if (p.IS_PAID) status = "Paid";

    data.push([
      `Invoice ID: ${p.ID}\nCreated: ${moment(p.CREATED_AT).format("DD MMM, YYYY")}`,
      `Cash Collection: ${cashCollection}\nDelivery Charge: ${p.TOTAL_SHOPUP_CHARGE}\nCOD Charge: ${p.TOTAL_COD_CHARGE}\nReturn Charge ${p.TOTAL_RETURN_CHARGE}`,
      p.AMOUNT,
      status
    ]);
  });
  const output = table(data);
  console.log(output);
};

const initDashboard = async (configs) => {
  const answer = await visibleRedXRecursively(configs);
  switch (answer) {
    case "Dashboard":
      await manageLogisticsDashboardSummary(configs);
      break;
    case "Parcels":
      await manageLogisticsParcels(configs);
      break;
    case "Payments":
      await manageLogisticsPayments(configs);
      break;
    case "Exit":
      process.exit(1);
    default:
  }

  await initDashboard(configs);
};

module.exports = {
  initDashboard,
};
