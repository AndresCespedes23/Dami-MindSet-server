/* eslint-disable no-console */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const router = require("./routes");

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(router);

mongoose
  .connect(
    "mongodb+srv://BaSD:BaSD2021@cluster0.fwaam.mongodb.net/BaSD_database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("🟢 DB Connected");
    app.listen({ port }, () => {
      console.log(`🚗 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("🔴 There was an error on the DB connection method.");
    console.log(err);
  });
