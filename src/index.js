/* eslint-disable no-console */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3000;
const router = require("./routes");

// // Routes
// const psychologistController = require("./controllers/psychologists");
// const clientsController = require("./controllers/clients");
// const candidatesController = require("./controllers/candidates");
// const adminsController = require("./controllers/admins");
// const positionsController = require("./controllers/positions.js");
// const interviewsController = require("./controllers/interviews");
// const sessionsController = require("./controllers/sessions.js");
// const profilesController = require("./controllers/profiles.js");

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());
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

app.get("/", (req, res) => {
  res.send("Welcome to MindSet!");
});

// //INTERVIEWS
// app.get("/interviews/create", interviewsController.create);
// app.get("/interviews/update/:id", interviewsController.update);
// app.get("/interviews/cancel/:id", interviewsController.remove);
// app.get("/interviews", interviewsController.getAll);
// app.get("/interviews/byId/:id", interviewsController.getById);

// //CLIENTS
// app.get("/clients/create", clientsController.create);
// app.get("/clients/update/:id", clientsController.update);
// app.get("/clients/remove/:id", clientsController.remove);
// app.get("/clients", clientsController.getAll);
// app.get("/clients/byId/:id", clientsController.getById);
// app.get("/clients/byName/:name", clientsController.getByName);
// app.get(
//   "/clients/byPhoneNumber/:phoneNumber",
//   clientsController.getByPhoneNumber
// );
// app.get("/clients/byCuit/:cuit", clientsController.getByCuit);
// app.get("/clients/byAddress/:address", clientsController.getByAddress);
// app.get("/clients/byActivity/:activity", clientsController.getByActivity);

// //ADMIN
// app.get("/admins/update/:id", adminsController.update);
// app.get("/admins", adminsController.getAll);
// app.get("/admins/byId/:id", adminsController.getById);
// app.get("/admins/byName/:name", adminsController.getByName);

// // POSITIONS
// app.get("/positions/create", positionsController.create);
// app.get("/positions/update/:id", positionsController.update);
// app.get("/positions/remove/:id", positionsController.remove);
// app.get("/positions", positionsController.getAll);
// app.get("/positions/byId/:id", positionsController.getById);
// app.get("/positions/byName/:name", positionsController.getByName);

// //SESSIONS
// app.get("/sessions/create", sessionsController.create);
// app.get("/sessions/update/:id", sessionsController.update);
// app.get("/sessions/remove/:id", sessionsController.remove);
// app.get("/sessions", sessionsController.getAll);
// app.get("/sessions/byId/:id", sessionsController.getById);
// app.get(
//   "/sessions/byIdPsychologist/:idPsychologist",
//   sessionsController.getByIdPsychologist
// );

// // PROFILES
// app.get("/profiles/create", profilesController.create);
// app.get("/profiles/update/:id", profilesController.update);
// app.get("/profiles/remove/:id", profilesController.remove);
// app.get("/profiles", profilesController.getAll);

// //PSYCHOLOGISTS
// app.get("/psychologists/create", psychologistController.create);
// app.get("/psychologists/update/:id", psychologistController.update);
// app.get("/psychologists/remove/:id", psychologistController.remove);
// app.get("/psychologists", psychologistController.getAll);
// app.get("/psychologists/byId/:id", psychologistController.getById);
// app.get("/psychologists/byName/:name", psychologistController.getByName);
