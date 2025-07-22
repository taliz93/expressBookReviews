const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const newuser = req.body.username;
  const newpass = req.body.password;
  
  if (newuser && newpass) {
    if (!isValid(newuser)) {
      users.push({"username": newuser, "password": newpass})
      return res.status(200).json({message: "user registered! Valid for login"});
    } else {
        return res.status(401).json({message: "user exists!"});
    }
  }
  return res.status(404).json({message: "missing information!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //promise that returns json on resolve
  let bookres = new Promise((resolve,reject) => {
    let payload = JSON.stringify(books);
    resolve(payload);
  })
  //use .then on it to take the return and call the result.send
  bookres.then((asynPayload) => {
    return res.send(asynPayload);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // see https://github.com/ibm-developer-skills-network/expressBookReviews/issues/219
  // index/id number = isbn
  let input = Number(req.params.isbn);
  let output = books[input];
  let payload = JSON.stringify(output);
  return res.send(payload);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let input = req.params.author;
  let indicies = Object.keys(books);
  let output = {};
  indicies.forEach(index => {
    if (books[index].author === input) {
        output[index] = books[index];
    }
  });
  let payload = JSON.stringify(output);
  return res.send(payload);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let input = req.params.title;
  let indicies = Object.keys(books);
  let output = {};
  indicies.forEach(index => {
    if (books[index].title === input) {
        output[index] = books[index];
    }
  });
  let payload = JSON.stringify(output);
  return res.send(payload);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let input = Number(req.params.isbn);
  let book = books[input];
  let output = book.reviews;
  let payload = JSON.stringify(output);
  return res.send(payload);
});

module.exports.general = public_users;
