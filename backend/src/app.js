// Require Express package and assign to variable
const express = require("express");

const path = require("path");

const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Error Handlers
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Require exercises router
const requestFormRouter = require("../src/requestForm/requestForm.router");

// Express package exports a function, when invoked, a new Express app is created and assigned to a variable
const app = express();

app.use(cors());

// express.json() creates a body property (req.body)
app.use(express.json());

// Require Morgan package
// Morgan will print useful info to terminal window on each request
const morgan = require("morgan");
app.use(morgan("dev"));

// Route set up 
app.use("/request-form", requestFormRouter);

// welcome route 
app.use("/", (req, res, next) => {
    res.send("Welcome to the backend homepage for my lawn service database")
})

app.use(notFound);
app.use(errorHandler);

// Export Express app to be used in other files
module.exports = app; 