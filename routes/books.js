const express = require('express');
const router = express.Router();

const collectionName = 'books'; 

router.get('/', async (req, res, next) => {
  try {
    const allBooks = await req.db.collection(collectionName).find({}).toArray();
    res.render('all-books', { title: 'All Books', books: allBooks });
  } catch (err) {
    next(err); 
  }
});

router.get('/add', (req, res, next) => {
  res.render('new-book', { title: 'Add New Book' });
});

router.post('/add', async (req, res, next) => {
  const newBook = req.body;
  if (!newBook.isbn || !newBook.title || !newBook.author) {
    return res.status(400).render('error', { message: 'ISBN, Title, and Author are required.', title: 'Error' });
  }

  try {
    const existingBook = await req.db.collection(collectionName).findOne({ isbn: newBook.isbn });
    if (existingBook) {
      return res.status(409).render('error', { message: 'A book with this ISBN already exists.', title: 'Error' });
    }

    await req.db.collection(collectionName).insertOne(newBook);
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});


router.get('/edit/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  try {
    const book = await req.db.collection(collectionName).findOne({ isbn: isbn });
    if (book) {
      res.render('edit-book-detail', { title: `Edit Book: ${book.title}`, book: book });
    } else {
      res.status(404).render('error', { message: 'Book not found for editing.', title: 'Error' });
    }
  } catch (err) {
    next(err);
  }
});

// POST to update an existing book (UPDATE - handle submission) - /books/edit/:isbn
router.post('/edit/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  const updatedBookData = req.body;
  delete updatedBookData.isbn; // Prevent ISBN from being updated

  if (!updatedBookData.title || !updatedBookData.author) {
    return res.status(400).render('error', { message: 'Title and Author are required.', title: 'Error' });
  }

  try {
    const result = await req.db.collection(collectionName).updateOne(
      { isbn: isbn },
      { $set: updatedBookData }
    );
    if (result.matchedCount === 0) {
      return res.status(404).render('error', { message: 'Book not found for updating.', title: 'Error' });
    }
    res.redirect(`/books/${isbn}`);
  } catch (err) {
    next(err);
  }
});

router.post('/delete/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  try {
    const result = await req.db.collection(collectionName).deleteOne({ isbn: isbn });
    if (result.deletedCount === 0) {
      return res.status(404).render('error', { message: 'Book not found for deletion.', title: 'Error' });
    }
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

// GET a single book by ISBN (READ) - /books/:isbn
router.get('/:isbn', async (req, res, next) => {
  const isbn = req.params.isbn;
  try {
    const book = await req.db.collection(collectionName).findOne({ isbn: isbn });
    if (book) {
      res.render('view-book', { title: book.title, book: book });
    } else {
      res.status(404).render('error', { message: 'Book not found.', title: 'Error' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;