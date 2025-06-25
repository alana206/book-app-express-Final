var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Show 3 random books on the home page (not all books)
    const books = await req.models.Book.find({});
    const shuffled = books.sort(() => 0.5 - Math.random());
    const randomBooks = shuffled.slice(0, 3);
    res.render('index', { title: 'Random Books', books: randomBooks });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
