var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const books = await req.models.Book.find({});
    res.render('index', { title: 'All Books', books: books });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
