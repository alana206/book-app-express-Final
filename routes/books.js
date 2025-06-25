const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const upload = multer({
  dest: path.join(__dirname, '../public/uploads/'),
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// GET all books
router.get('/', async (req, res, next) => {
  try {
    const allBooks = await req.models.Book.find({});
    res.render('all-books', { title: 'All Books', books: allBooks });
  } catch (err) {
    next(err); 
  }
});

// GET add book form
router.get('/add', (req, res, next) => {
  res.render('new-book', { title: 'Add New Book' });
});

// POST add new book
router.post('/add', upload.single('coverImage'), async (req, res, next) => {
  const newBook = req.body;
  if (!newBook.isbn || !newBook.title || !newBook.author) {
    return res.status(400).render('error', { message: 'ISBN, Title, and Author are required.', title: 'Error' });
  }

  // If a file was uploaded, save its path
  if (req.file) {
    newBook.coverImage = '/uploads/' + req.file.filename;
  }

  try {
    // Make sure isbn is a string for consistent querying
    const isbnStr = String(newBook.isbn);

    // Check for existing book by ISBN
    const existingBook = await req.models.Book.findOne({ isbn: isbnStr });
    if (existingBook) {
      return res.status(409).render('error', { message: 'A book with this ISBN already exists.', title: 'Error' });
    }

    newBook.isbn = isbnStr; // Ensure isbn is stored as string

    // Create new book
    await req.models.Book.create(newBook);
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

// GET edit book form
router.get('/edit/:isbn', async (req, res, next) => {
  const isbn = String(req.params.isbn);
  try {
    const book = await req.models.Book.findOne({ isbn: isbn });
    if (book) {
      res.render('edit-book-detail', { title: `Edit Book: ${book.title}`, book: book });
    } else {
      res.status(404).render('error', { message: 'Book not found for editing.', title: 'Error' });
    }
  } catch (err) {
    next(err);
  }
});

// POST update book
router.post('/edit/:isbn', async (req, res, next) => {
  const isbn = String(req.params.isbn);
  const updatedBookData = req.body;
  delete updatedBookData.isbn; // Prevent ISBN from being updated

  if (!updatedBookData.title || !updatedBookData.author) {
    return res.status(400).render('error', { message: 'Title and Author are required.', title: 'Error' });
  }

  try {
    const result = await req.models.Book.updateOne(
      { isbn: isbn },
      { $set: updatedBookData }
    );
    if (result.matchedCount === 0 && result.n === 0) {
      return res.status(404).render('error', { message: 'Book not found for updating.', title: 'Error' });
    }
    res.redirect(`/books/${isbn}`);
  } catch (err) {
    next(err);
  }
});

// POST delete book
router.post('/delete/:isbn', async (req, res, next) => {
  const isbn = String(req.params.isbn);
  try {
    const result = await req.models.Book.deleteOne({ isbn: isbn });
    if (result.deletedCount === 0) {
      return res.status(404).render('error', { message: 'Book not found for deletion.', title: 'Error' });
    }
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

// GET single book by ISBN
router.get('/:isbn', async (req, res, next) => {
  const isbn = String(req.params.isbn);
  try {
    const book = await req.models.Book.findOne({ isbn: isbn });
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