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

// Middleware to parse URL-encoded bodies
app.use(express.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// GET - /welcome - Responds with a welcome message
app.get("/welcome", (req, res) => {
  res.send("Happy Wednesday! No class tomorrow!");
});

// POST - /submit-form - Handles form submission and response with a message
// expects a form with "username" and "email" values
app.post("/submit-form", (req, res) => {
  const { username, email } = req.body;

  console.log(`Username: ${username}, Email: ${email}`);
  res.send(
    `Form submitted successfully! Username: ${username}, Email: ${email}`
  );
});

const animals = [
  {
    id: 1,
    type: "Dog",
    name: "Buddy",
    age: 3,
    favoriteFoods: ["Chicken", "Beef", "Carrots"],
  },
  {
    id: 2,
    type: "Cat",
    name: "Whiskers",
    age: 2,
    favoriteFoods: ["Fish", "Tuna", "Milk"],
  },
  {
    id: 3,
    type: "Bird",
    name: "Tweety",
    age: 1,
    favoriteFoods: ["Seeds", "Fruits", "Insects"],
  },
  {
    id: 4,
    type: "Fish",
    name: "Nemo",
    age: 1,
    favoriteFoods: ["Flakes", "Worms"],
  },
];

// GET - /animals - responds with all animals
app.get("/animals", (req, res) => {
  res.json(animals);
});

// GET - /animals/:id - response with ONE animal by id
app.get("/animals/:id", (req, res) => {
  const animalId = parseInt(req.params.id, 10);
  const animal = animals.find((a) => a.id === animalId);

  if (animal) {
    res.json(animal);
  } else {
    res.status(404).send("Animal not found");
  }
});

// POST - /animals - adds a new animal to the list
app.post("/animals", (req, res) => {
  const { type, name, age, favoriteFoods } = req.body;

  if (!type || !name || !age || !favoriteFoods) {
    return res.status(400).send("All fields are required");
  }

  const newAnimal = {
    id: animals.length + 1,
    type,
    name,
    age: parseInt(age, 10),
    favoriteFoods,
  };

  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

// PUT - /animals/:id - update an existing animal by id
app.put("/animals/:id", (req, res) => {
  const animalId = parseInt(req.params.id, 10);
  const animalIndex = animals.findIndex((a) => a.id === animalId);

  if (animalIndex === -1) {
    return res.status(404).send("Animal not found");
  }

  const { type, name, age, favoriteFoods } = req.body;

  if (!type || !name || !age || !favoriteFoods) {
    return res.status(400).send("All fields are required");
  }

  const updatedAnimal = {
    id: animalId,
    type,
    name,
    age: parseInt(age, 10),
    favoriteFoods,
  };

  animals[animalIndex] = updatedAnimal;
  res.json(updatedAnimal);
});

// PATCH - /animals/:id - partially update an existing animal record by id
app.patch("/animals/:id", (req, res) => {
  const animalId = parseInt(req.params.id, 10);
  const animalIndex = animals.findIndex((a) => a.id === animalId);

  if (animalIndex === -1) {
    return res.status(404).send("Animal not found");
  }

  const { type, name, age, favoriteFoods } = req.body;
  const animal = animals[animalIndex];

  if (type) animal.type = type;
  if (name) animal.name = name;
  if (age) animal.age = parseInt(age, 10);
  if (favoriteFoods) animal.favoriteFoods = favoriteFoods;

  res.json(animal);
});

// DELETE - /animals/:id - delete an animal by id
app.delete("/animals/:id", (req, res) => {
  const animalId = parseInt(req.params.id, 10);
  const animalIndex = animals.findIndex((a) => a.id === animalId);

  if (animalIndex === -1) {
    return res.status(404).send("Animal not found");
  }

  animals.splice(animalIndex, 1);
  res.json({ message: "Animal deleted successfully" });
});

// DELETE - /animals - delete all animals
app.delete("/animals", (req, res) => {
  animals.length = 0; // Clear the array
  res.json({ message: "All animals deleted successfully" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
