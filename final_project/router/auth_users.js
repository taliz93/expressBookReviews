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
  const currentuser = req.body.username;
  const currentpass = req.body.password;
  
  if (currentuser && currentpass) {
    if (!authenticatedUser(currentuser,currentpass)) {
      return res.status(208).json({message:"invalid login! check creds"});
    } else {
      let nuToken = jwt.sign({
        data: currentpass
      }, 'access', {expiresIn: 3600});
      req.session.authorization = {
        nuToken, currentuser
      };
      return res.status(200).json({message: "login successful!"});
    }
  } else {
    return res.status(404).json({message: "missing data!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
