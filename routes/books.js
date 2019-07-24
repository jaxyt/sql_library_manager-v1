var express = require('express');
var router = express.Router();

const books = [
  {title: "A Brief History of Time", author: "Stephen Hawking", genre: "Non Fiction", year: 1988},
  {title: "Armada", author: "Ernest Cline", genre: "Science Fiction", year: 2015},
  {title: "Emma", author: "Jane Austen", genre: "Classic", year: 1815}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("index", {books: books, title: "Books"});
});

module.exports = router;
