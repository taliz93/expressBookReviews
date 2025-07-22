const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let payload = JSON.stringify(books);
  return res.send(payload);
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
