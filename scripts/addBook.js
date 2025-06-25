require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Books');

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookapp";

async function addBook() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const newBook = new Book({
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    subtitle: "A JavaScript and jQuery Developer's Guide",
    author: "Addy Osmani",
    publisher: "O'Reilly Media",
    published: "2012-07-01",
    pages: 254,
    description: "A book on JavaScript design patterns.",
    website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
    coverImage: "/images/default-cover.jpg"
  });

  await newBook.save();
  console.log("Book added!");
  mongoose.disconnect();
}

addBook().catch(err => {
  console.error(err);
  mongoose.disconnect();
});