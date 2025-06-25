const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn: Number,
  title: String,
  subtitle: String,
  author: String,
  publisher: String,
  published: String,
  pages: Number,
  description: String,
  website: String,
});

module.exports = mongoose.model('Book', bookSchema);

router.get('/', async (req, res, next) => {
  try {
    const allBooks = await req.models.Book.find({});
    res.render('all-books', { title: 'All Books', books: allBooks });
  } catch (err) {
    next(err); 
  }
});
// ...and similarly update other CRUD operations to use req.models.Book...