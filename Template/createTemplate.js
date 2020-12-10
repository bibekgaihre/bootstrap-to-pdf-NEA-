const Handlebars = require("handlebars");
let waterdata = require("../data/waterbill.json");
let worldlinkdata = require("../data/internet.json");
let subisuData = require("../data/subisu.json");

const fs = require("fs");

const createWaterBillTempate = async () => {
  let text = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Water bill</title>
        <!-- <link rel="stylesheet" href="./main.css" /> -->
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        />
      </head>
      <style>
        body {
          font-family: "Times New Roman", Times, serif !important;
        }
    
        .headtext {
          padding-top: 2%;
    
          font-size: x-large;
        }
    
        .box {
          /* font-family: "Visby CF Bold"; */
          margin: 0 auto;
          top: 10%;
          border-color: #416497;
          width: 100%;
          border-style: solid;
          border-width: 2px;
          padding: 14px;
          position: relative;
        }
    
        .label {
          color: #416497;
        }
      </style>
      <body>
        <div class="container-fluid lay">
          <main id="content" class="bd-masthead" role="main">
            <div class="container" style="margin-bottom: 27%">
              <div class="row">
                <div class="col-md-12 order-md-1 pr-md-5 text-center"></div>
              </div>
              <div class="row">
                <div class="col-md-12 order-md-1 pr-md-5">
                  <div class="box">
                    <div class="row">
                      <div class="col-md-3 order-md-1 pr-md-5">
                        <img
                          src="data:image/png;base64,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"
                          width="80px"
                          height="80px"
                        />
                      </div>
                      <div
                        class="col-md-6 order-md-1 pr-md-5"
                        style="padding-top: 8px"
                      >
                        <span class="label" style="text-align: center">
                          <h4>
                            <strong>नेपाल खानेपानी संस्थान</strong>
                          </h4>
                        </span>
                        <br />
                        <span style="text-align: center">
                          <h6>
                            <span class="label"></span
                            ><span class="counter">{{counter}}</span>
                          </h6>
                        </span>
                      </div>
                      <div
                        class="col-md-3 order-md-1 pr-md-5 label"
                        style="padding-top: 32px; font-size: x-small"
                      >
                        <span> Payment Receipt</span>
                      </div>
                    </div>
                    <br />
                    <div class="row" style="overflow-x: auto">
                      <div class="col-md-12 order-md-1 pr-md-5">
                        <table
                          style="width: 100%; text-align: left; font-size: x-small"
                        >
                          <tr>
                            <td class="label">Reference Code</td>
                            <td>:&nbsp;{{referenceCode}}</td>
                            <td class="label">Date</td>
                            <td>:&nbsp;{{date}}</td>
                          </tr>
                          <tr>
                            <td class="label">Amount</td>
                            <td>:&nbsp;{{amount}}</td>
                            <td class="label">Channel</td>
                            <td>:&nbsp;{{channel}}</td>
                          </tr>
                          <tr>
                            <td class="label">Status</td>
                            <td>:&nbsp;{{status}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <br />
                    <hr style="border-top: 1px dotted #909599" />
                    <div class="row" style="overflow-x: auto">
                      <div class="col-md-12 order-md-1 pr-md-5">
                        <table
                          style="width: 50%; text-align: left; font-size: x-small"
                        >
                          <tr>
                            <td class="label">Customer Code</td>
                            <td>:&nbsp;{{customerCode}}</td>
                          </tr>
                          <tr>
                            <td class="label">Request Unique Id</td>
                            <td>:&nbsp;{{requestUniqueId}}</td>
                          </tr>
                          <tr>
                            <td class="label">Counter</td>
                            <td>:&nbsp;{{counterId}}</td>
                          </tr>
                          <tr>
                            <td class="label">Vendor Transaction Id</td>
                            <td>:&nbsp;{{vendorTransactionId}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
    
                    <hr style="border-top: 1px dotted #909599" />
                    <div class="row" style="overflow-x: auto">
                      <div class="col-md-12 order-md-1 pr-md-5">
                        <table
                          style="width: 50%; text-align: left; font-size: x-small"
                        >
                          <tr>
                            <td class="label">Paid By &emsp;&emsp;&nbsp;</td>
                            <td>:&nbsp;{{paidBy}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <hr style="border-top: 1px dotted #909599" />
    
                    <br />
                    <div class="row">
                      <div
                        class="col-md-4 order-md-1 pr-md-5"
                        style="text-align: right; font-size: x-small"
                      >नेपाल खानेपानी संस्थानको आधिकारिक महशुल संकलक
                      </div>
                      <div class="col-md-5 order-md-1 pr-md-5 text-center">
                        <img
                          src="./8a3681af-0bc8-4b23-9dbc-ce455892eee9.jpeg"
                          width="42px"
                          height="42px"
                        />
                      </div>
                      <div class="col-md-3 order-md-1 pr-md-5">
                      <div class="row">
                        <div class="col-12 text-center">
                          <hr
                            style="border-top: 1px dotted; margin-bottom: 0.5rem"
                          />
                          <span style="font-size: x-small">Signature</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
    
              <br />
              <br />
              <div class="row">
                <div class="col-md-12 order-md-1 pr-md-5 text-center">
                  <span>
                    Customer Support: 844684664, 9896562332, 656613131315</span
                  >
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
    `;

  var template = Handlebars.compile(text);
  var result = template(waterdata);

  fs.writeFile("water_bill_template.html", result, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return waterdata;
};

const createWorldlinkBillTemplate = async () => {
  let text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Worldink bill</title>
      <!-- <link rel="stylesheet" href="./main.css" /> -->
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
    </head>
    <style>
      body {
        font-family: "Times New Roman", Times, serif !important;
      }
  
      .headtext {
        padding-top: 2%;
  
        font-size: x-large;
      }
  
      .box {
        /* font-family: "Visby CF Bold"; */
        margin: 0 auto;
        top: 10%;
        border-color: #416497;
        width: 100%;
        border-style: solid;
        border-width: 2px;
        padding: 14px;
        position: relative;
      }
  
      .label {
        color: #416497;
      }
    </style>
    <body>
      <div class="container-fluid lay">
        <main id="content" class="bd-masthead" role="main">
          <div class="container" style="margin-bottom: 27%">
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5 text-center"></div>
            </div>
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5">
                <div class="box">
                  <div class="row">
                    <div class="col-md-3 order-md-1 pr-md-5">
                      <img
                        src="https://blog.apnic.net/wp-content/uploads/2020/06/WorldLink_white_banner-555x202.png?v=09862861d39bab1f96cc5cc93ff7f9c0"
                        width="170px"
                        height="80px"
                      />
                    </div>
                    <div
                      class="col-md-6 order-md-1 pr-md-5"
                      style="padding-top: 8px"
                    >
                      <span class="label" style="text-align: center">
                        <h4>
                          <strong>Worldlink Payment</strong>
                        </h4>
                      </span>
                      <br />
                      <span style="text-align: center">
                        <h6>
                          <span class="label"></span
                          ><span class="counter">PAYMENT RECEIPT</span>
                        </h6>
                      </span>
                    </div>
                    <div
                      class="col-md-3 order-md-1 pr-md-5 label"
                      style="padding-top: 32px; font-size: x-small"
                    >
                      <span> </span>
                    </div>
                  </div>
                  <br />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 100%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Reference Code</td>
                          <td>:&nbsp;{{referenceCode}}</td>
                          <td class="label">Date</td>
                          <td>:&nbsp;{{date}}</td>
                        </tr>
                        <tr>
                          <td class="label">Amount</td>
                          <td>:&nbsp;{{amount}}</td>
                          <td class="label">Channel</td>
                          <td>:&nbsp;{{channel}}</td>
                        </tr>
                        <tr>
                          <td class="label">Status</td>
                          <td>:&nbsp;{{status}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
  
                  <hr style="border-top: 1px dotted #909599" />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 50%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Accept Advance Payment</td>
                          <td>:&nbsp;{{acceptAdvancePayment}}</td>
                        </tr>
                        <tr>
                          <td class="label">Saved Payment</td>
                          <td>:&nbsp;{{savedPayment}}</td>
                        </tr>
                        <tr>
                          <td class="label">Invoice Id</td>
                          <td>:&nbsp;{{invoiceId}}</td>
                        </tr>
                        <tr>
                          <td class="label">Request Unique Id</td>
                          <td>:&nbsp;{{requestUniqueId}}</td>
                        </tr>
                        <tr>
                          <td class="label">Service Name</td>
                          <td>:&nbsp;{{serviceName}}</td>
                        </tr>
                        <tr>
                          <td class="label">Current Package</td>
                          <td>:&nbsp;{{currentPackage}}</td>
                        </tr>
                        <tr>
                          <td class="label">User Id</td>
                          <td>:&nbsp;{{userId}}</td>
                        </tr>
                        <tr>
                          <td class="label">Username</td>
                          <td>:&nbsp;{{username}}</td>
                        </tr>
                        <tr>
                          <td class="label">Renewable Package</td>
                          <td>:&nbsp;{{renewablePackage}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
  
                  <hr style="border-top: 1px dotted #909599" />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 50%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Paid By &nbsp;&nbsp;&nbsp;</td>
                          <td>:&nbsp;{{paidBy}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <hr style="border-top: 1px dotted #909599" />
  
                  <br />
                  <div class="row">
                    <div
                      class="col-md-4 order-md-1 pr-md-5"
                      style="text-align: right; font-size: x-small"
                    >
                      Official tariff collector of Worldlink Communications
                    </div>
                    <div class="col-md-5 order-md-1 pr-md-5 text-center">
                      <img
                        src="./8a3681af-0bc8-4b23-9dbc-ce455892eee9.jpeg"
                        width="42px"
                        height="42px"
                      />
                    </div>
                    <div class="col-md-3 order-md-1 pr-md-5">
                      <div class="row">
                        <div class="col-12 text-center">
                          <hr
                            style="border-top: 1px dotted; margin-bottom: 0.5rem"
                          />
                          <span style="font-size: x-small">Signature</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <br />
            <br />
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5 text-center">
                <span>
                  Customer Support: 844684664, 9896562332, 656613131315</span
                >
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  </html>
  
  `;
  var template = Handlebars.compile(text);
  var result = template(worldlinkdata);

  fs.writeFile("worldlink_bill_template.html", result, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return worldlinkdata;
};

const createSubisuBillTemplate = async () => {
  let text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Subisu bill</title>
      <!-- <link rel="stylesheet" href="./main.css" /> -->
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
    </head>
    <style>
      body {
        font-family: "Times New Roman", Times, serif !important;
      }
  
      .headtext {
        padding-top: 2%;
  
        font-size: x-large;
      }
  
      .box {
        /* font-family: "Visby CF Bold"; */
        margin: 0 auto;
        top: 10%;
        border-color: #416497;
        width: 100%;
        border-style: solid;
        border-width: 2px;
        padding: 14px;
        position: relative;
      }
  
      .label {
        color: #416497;
      }
    </style>
    <body>
      <div class="container-fluid lay">
        <main id="content" class="bd-masthead" role="main">
          <div class="container" style="margin-bottom: 27%">
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5 text-center"></div>
            </div>
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5">
                <div class="box">
                  <div class="row">
                    <div class="col-md-3 order-md-1 pr-md-5">
                      <img
                        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEh8OE7zkcaQQ/company-logo_200_200/0/1519893385427?e=2159024400&v=beta&t=3JhVrQ4aqZLHyQGHvWw_y6SoMxe1rs1VfrE3BSWr2l0"
                        width="100px"
                        height="80px"
                      />
                    </div>
                    <div
                      class="col-md-6 order-md-1 pr-md-5"
                      style="padding-top: 8px"
                    >
                      <span class="label" style="text-align: center">
                        <h4>
                          <strong>Subisu Cablenet</strong>
                        </h4>
                      </span>
                      <br />
                      <span style="text-align: center">
                        <h6>
                          <span class="label"></span
                          ><span class="counter">PAYMENT RECEIPT</span>
                        </h6>
                      </span>
                    </div>
                    <div
                      class="col-md-3 order-md-1 pr-md-5 label"
                      style="padding-top: 32px; font-size: x-small"
                    >
                      <span> </span>
                    </div>
                  </div>
                  <br />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 100%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Reference Code</td>
                          <td>:&nbsp;{{referenceCode}}</td>
                          <td class="label">Date</td>
                          <td>:&nbsp;{{date}}</td>
                        </tr>
                        <tr>
                          <td class="label">Amount</td>
                          <td>:&nbsp;{{amount}}</td>
                          <td class="label">Channel</td>
                          <td>:&nbsp;{{channel}}</td>
                        </tr>
                        <tr>
                          <td class="label">Status</td>
                          <td>:&nbsp;{{status}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
  
                  <hr style="border-top: 1px dotted #909599" />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 100%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Subisu Reference Id</td>
                          <td>:&nbsp;{{subisuReferenceId}}</td>
                        </tr>
                        <tr>
                          <td class="label">Alert Mobile No</td>
                          <td>:&nbsp;{{alertMobileNo}}</td>
                        </tr>
                        <tr>
                          <td class="label">Subisu Response Message</td>
                          <td>:&nbsp;{{subisuResponseMessage}}</td>
                        </tr>
                        <tr>
                          <td class="label">Request Unique Id</td>
                          <td>:&nbsp;{{requestUniqueId}}</td>
                        </tr>
                        <tr>
                          <td class="label">Username</td>
                          <td>:&nbsp;{{username}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
  
                  <hr style="border-top: 1px dotted #909599" />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 90%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Paid By</td>
                          <td>:&nbsp;{{paidBy}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <hr style="border-top: 1px dotted #909599" />
  
                  <br />
                  <div class="row">
                    <div
                      class="col-md-4 order-md-1 pr-md-5"
                      style="text-align: right; font-size: x-small"
                    >
                      Official tariff collector of Subisu Cablenet
                    </div>
                    <div class="col-md-5 order-md-1 pr-md-5 text-center">
                      <img
                        src="./8a3681af-0bc8-4b23-9dbc-ce455892eee9.jpeg"
                        width="42px"
                        height="42px"
                      />
                    </div>
                    <div class="col-md-3 order-md-1 pr-md-5">
                      <div class="row">
                        <div class="col-12 text-center">
                          <hr
                            style="border-top: 1px dotted; margin-bottom: 0.5rem"
                          />
                          <span style="font-size: x-small">Signature</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <br />
            <br />
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5 text-center">
                <span>
                  Customer Support: 844684664, 9896562332, 656613131315</span
                >
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  </html>
  `;
  var template = Handlebars.compile(text);
  var result = template(subisuData);

  fs.writeFile("subisu_bill_template.html", result, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return subisuData;
};

module.exports = {
  createWaterBillTempate,
  createWorldlinkBillTemplate,
  createSubisuBillTemplate,
};
