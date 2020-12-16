const Handlebars = require("handlebars");
let data = require("./data.json");
const fs = require("fs");

const createTemplate = async () => {
  let text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Electricity bill</title>
      <!-- <link rel="stylesheet" href="./main.css" /> -->
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous"
      />
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
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
        border-color: #ff900a;
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
          <div
            class="container"
            style="margin-bottom: 27%; width: 490px; height: 645px"
          >
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5 text-center"></div>
            </div>
            <div class="row">
              <div class="col-md-12 order-md-1 pr-md-5">
                <div class="box">
                  <div class="row">
                    <div class="col-md-3 order-md-1 pr-md-5">
                      <img
                        src="https://image.winudf.com/v2/image1/Y29tLm5lcGFsZWxlY3RyaWNpdHlhdXRob3JpdHkubmVhX2ljb25fMTU0NzUyOTgxOF8wMDM/icon.png?w=170&fakeurl=1"
                        width="60px"
                        height="60px"
                      />
                    </div>
                    <div
                      class="col-md-6 order-md-1 pr-md-5"
                      style="padding-top: 8px"
                    >
                      <span class="label" style="text-align: center">
                        <h3>
                          <strong>नेपाल बिद्युत प्राधिकरण </strong>
                        </h3>
                      </span>
  
                      <span style="text-align: center">
                        <h6>
                          <span class="label">Counter:</span
                          ><span class="counter">{{counter}}</span>
                        </h6>
                      </span>
                    </div>
                    <div
                      class="col-md-3 order-md-1 pr-md-5 label"
                      style="padding-top: 32px; font-size: small; color: black"
                    >
                      <span> NEA Online Payment </span>
                    </div>
                  </div>
                  <br />
                  <div class="row" style="overflow-x: auto">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 100%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <td class="label">Rept.ID</td>
                          <td>:&nbsp;{{rept_id}}</td>
                          <td class="label">Sc.No</td>
                          <td>:&nbsp;{{sc_no}}</td>
                        </tr>
                        <tr>
                          <td class="label">Date</td>
                          <td>:&nbsp;{{date}}</td>
                          <td class="label">Customer ID</td>
                          <td>:&nbsp;{{customer_id}}</td>
                        </tr>
                        <tr>
                          <td class="label">Paid By</td>
                          <td>:&nbsp;{{paidby}}</td>
                          <td class="label">Channel</td>
                          <td>:&nbsp;{{channel}}</td>
                        </tr>
                        <tr>
                          <td class="label">Name</td>
                          <td>:&nbsp;{{name}}</td>
                          <td class="label">Status</td>
                          <td>:&nbsp;{{status}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <br />
                  <hr style="border-top: 1px dotted #909599" />
                  <div class="row">
                    <div class="col-md-12 order-md-1 pr-md-5">
                      <table
                        style="width: 100%; text-align: left; font-size: x-small"
                      >
                        <tr>
                          <th class="label">Due Bill of</th>
                          <th class="label">Reb/Pen</th>
                          <th class="label">Date</th>
                          <th class="label">Rate</th>
                          <th class="label">Bill Amount</th>
                          <th class="label">Payable Amount</th>
                        </tr>
                        {{#data}}
                        <tr>
                          <td>{{duebillof}}</td>
                          <td>{{reb_pen}}</td>
                          <td>{{date}}</td>
                          <td>{{rate}}</td>
                          <td>{{billamount}}</td>
                          <td>{{payableamount}}</td>
                        </tr>
                        {{/data}}
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
                          <td class="label">Paid &emsp;&emsp;&nbsp;</td>
                          <td>:&nbsp;{{paid}} ({{paidtime}})</td>
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
                        <div class="col-3 text-center">
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
  var result = template(data);

  fs.writeFile("electricity_bill_template.html", result, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return data;
};
module.exports = { createTemplate };
