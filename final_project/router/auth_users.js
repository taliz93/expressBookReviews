const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let user = users.filter((user) => user.username === username);
  if (user.length > 0) {
    return true;
  }
  return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let user = users.filter((user) => user.username === username);
  if (user.length > 0) {
    let output = user[0];
    if (output.password === password) {
        return true;
    };
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!authenticatedUser(username,password)) {
      return res.status(208).json({message:"invalid login! check creds"});
    } else {
      let accessToken = jwt.sign({
        data: password
      }, 'access', {expiresIn: 3600});
      req.session.authorization = {
        accessToken, username
      };
      return res.status(200).json({message: "login successful!"});
    }
  } else {
    return res.status(404).json({message: "missing data!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  console.log(req.session.authorization.username);
  let input = Number(req.params.isbn);
  let reviewtext = req.body.review;
  let reviewuser = req.session.authorization.username;
  let reviewlist = books[input].reviews;
  console.log(books[input]);
  reviewlist[reviewuser] = reviewtext;
  books[input].reviews = reviewlist;
  console.log(books[input]);
  return res.status(200).json({message: `put ${reviewuser}'s review for isbn ${input}!`});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
