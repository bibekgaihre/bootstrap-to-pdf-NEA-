const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const exphbs = require("express-handlebars");

const toPdf = require("html-gen-pdf");
const createTemplate = require("./createTemplate");

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
  let data = await createTemplate.createTemplate();

  await toPdf(
    "./electricity_bill_template.html",
    `./${data.sc_no}_${data.date}.pdf`,
    {
      format: "A3",
      landscape: false,
    }
  );

  res.sendStatus(200);
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
