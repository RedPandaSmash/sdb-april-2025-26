// module sytax
// import express from 'express';

// commonjs syntax
const express = require("express");

// Create an instance of an Express application
const app = express();

// Define the port number
const PORT = 8080;

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// GET - /welcome - Responds with a welcome message
app.get("/welcome", (req, res) => {
  res.send("Happy Wednesday! No class tomorrow!");
});

app.get("/hippopotamus", (req, res) => {
  res.send("Hippopotamus.");
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
