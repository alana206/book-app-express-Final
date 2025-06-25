var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const books = await req.db.collection('books').find({}).toArray();
    // Shuffle and pick 3 random books
    const shuffled = books.sort(() => 0.5 - Math.random());
    const randomBooks = shuffled.slice(0, 3);
    res.render('index', { title: 'Random Books', books: randomBooks });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
