// module sytax
// import express from 'express';

// commonjs syntax
const express = require("express");

const app = express();

const PORT = 8080;

app.get("/welcome", (req, res) => {
  res.send("Happy Wednesday! No class tomorrow!");
});

app.get("/hippopotamus", (req, res) => {
  res.send("Hippopotamus.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
