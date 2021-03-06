const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const exphbs = require("express-handlebars");

const toPdf = require("html-gen-pdf");
// const createTemplate = require("./createTemplate");
const createTemplate = require("./Template/createTemplate");
const et = require("./createTemplate");
const { create } = require("express-handlebars");
const { request } = require("http");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  let data = await et.createTemplate();

  await toPdf(
    "./electricity_bill_template.html",
    `./${data.sc_no}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );

  res.sendStatus(200);
});

app.get("/waterbill", async (req, res, next) => {
  let data = await createTemplate.createWaterBillTempate();

  await toPdf(
    "./water_bill_template.html",
    `./${data.customerCode}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/worldlink", async (req, res, next) => {
  let data = await createTemplate.createWorldlinkBillTemplate();
  await toPdf(
    "./worldlink_bill_template.html",
    `./${data.userId}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/subisu", async (req, res, next) => {
  let data = await createTemplate.createSubisuBillTemplate();
  await toPdf(
    "./subisu_bill_template.html",
    `./${data.username}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/dishhome", async (req, res, next) => {
  let data = await createTemplate.createDishHomeTemplate();
  await toPdf(
    "./dishhome_bill_template.html",
    `./${data.customerName}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/bussewa", async (req, res, next) => {
  let data = await createTemplate.createBusSewaTemplate();
  await toPdf(
    "./bussewa_bill_template.html",
    `./${data.name}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/easytaxi", async (req, res, next) => {
  let data = await createTemplate.createEasyTaxiTemplate();
  await toPdf(
    "./easytaxi_bill_template.html",
    `./${data.name}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/edx", async (req, res, next) => {
  let data = await createTemplate.createEdxTemplate();
  await toPdf(
    "./edx_bill_template.html",
    `./${data.username}_${data.date}.pdf`,
    {
      format: "A5",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/statement", async (req, res, next) => {
  let data = await createTemplate.createKuraakaniTemplate();
  await toPdf(
    "./kuraakani_statement_template.html",
    `./${data.username}_${data.from}.pdf`,
    {
      format: "A4",
      landscape: false,
    }
  );
  res.sendStatus(200);
});

app.get("/home", function (req, res, next) {
  res.render("home", {
    title: "hello",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5001, () => {
  console.log("server is running on port 5001");
});
