var express = require("express");
var router = express.Router();

var books = [
    {
        id: 1,
        name: "book 1",
        author: "David"
    },
    {
        id: 2,
        name: "book 2",
        author: "John"
    },
    {
        id: 3,
        name: "book 3",
        author: "Tom"
    }
];

router.get("/", function(req, res) {
    res.json(books);
});

router.get('/:id', (req, res) => {
    // Reading isbn from the URL
    const bookId = req.params.id;
    console.log(bookId);

    var book = books.find(item => item.id == bookId);
    res.json(book);
});

router.post("/", function(req, res) {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

router.post('/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.id == id) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});

router.delete('/:id', (req, res) => {
    // Reading isbn from the URL
    const id = req.params.id;

    // Remove item from the books array
    books = books.filter(i => {
        if (i.id != id) {
            return true;
        }
        return false;
    });

    res.send('Book is deleted');
});

module.exports = router;
