require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { MongoClient } = require("mongodb");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books.js"); //

const app = express();

// MongoDB Connection Setup
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "bookapp";
const collectionName = "books";
let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);

    const { books } = require("./data/books");
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertMany(books);
      console.log("Initial book data inserted into MongoDB.");
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}
connectToMongo();

app.use((req, res, next) => {
  if (!db) {
    // Database not ready yet
    return res.status(503).render('error', { message: 'Database not connected. Please try again later.', title: 'Error' });
  }
  req.db = db;
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
