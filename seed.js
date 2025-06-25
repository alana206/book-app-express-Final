require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Books');
const { books } = require('./data/books');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookapp";

async function seedBooks() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Fix: Ensure all books use 'coverImage' property
  const fixedBooks = books.map(b => ({
    ...b,
    coverImage: b.coverImage || b.bookcover || '/images/default-cover.jpg'
  }));

  await Book.deleteMany({});
  await Book.insertMany(fixedBooks);

  console.log('Books seeded!');
  mongoose.disconnect();
}

seedBooks().catch(err => {
  console.error(err);
  mongoose.disconnect();
});