var express = require('express');
var router = express.Router();

const books = [
  {id: 1, title: "A Brief History of Time", author: "Stephen Hawking", genre: "Non Fiction", year: 1988},
  {id: 2, title: "Armada", author: "Ernest Cline", genre: "Science Fiction", year: 2015},
  {id: 3, title: "Emma", author: "Jane Austen", genre: "Classic", year: 1815}
]

function find(id) {
  var matchedBooks = books.filter(function(book) { return book.id == id; });
  return matchedBooks[0];
}

/* GET books listing. */
router.get('/', function(req, res, next) {
  res.render("index", {books: books, title: "Books"});
});

/* POST create book. */
router.post('/new', function(req, res, next) {
  var book = Object.assign({}, req.body, {
    id: books.length + 1,
  });
  books.push(book);

  res.redirect("/books");
});

/* Create a new book form. */
router.get('/new', function(req, res, next) {
  res.render("books/new-book", {book: {}, title: "New Book"});
});

/* Edit book form. */
router.get("/:id", function(req, res, next){
  var book = find(req.params.id);  

  res.render("books/update-book", {book: book, title: "Update Book"});
});

/* PUT update book. */
router.put("/:id", function(req, res, next){
  var book = find(req.params.id);
  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.year = req.body.year;
  
  res.redirect("/books");    
});

/* DELETE individual book. */
router.delete("/:id/delete", function(req, res, next){
  var book = find(req.params.id);  
  var index = books.indexOf(book);
  books.splice(index, 1);

  res.redirect("/books");
});


module.exports = router;
