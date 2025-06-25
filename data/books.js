const books = [
  {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    subtitle: "A JavaScript and jQuery Developer's Guide",
    published: "2012-07-01",
    publisher: "O'Reilly Media",
    pages: 254,
    description:
      "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language.",
    website:
      "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781449331818-L.jpg",
  },
  {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    subtitle: "An In-Depth Guide for Programmers",
    published: "2014-02-01",
    publisher: "O'Reilly Media",
    pages: 460,
    description:
      "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.",
    website: "http://speakingjs.com/",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781449365035-L.jpg",
  },
  {
    isbn: "9781491950296",
    title: "Programming JavaScript Applications",
    author: "Eric Elliott",
    subtitle:
      "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
    published: "2014-07-01",
    publisher: "O'Reilly Media",
    pages: 254,
    description:
      "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain.",
    website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781491950296-L.jpg",
  },
  {
    isbn: "9781593277574",
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    subtitle: "The Definitive Guide for JavaScript Developers",
    published: "2016-09-03",
    publisher: "No Starch Press",
    pages: 352,
    description:
      "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language.",
    website: "https://leanpub.com/understandinges6/read",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781593277574-L.jpg",
  },
  {
    isbn: "9781491904244",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    subtitle: "ES6 & Beyond",
    published: "2015-12-27",
    publisher: "O'Reilly Media",
    pages: 278,
    description:
      "No matter how much experience you have with JavaScript, odds are you don't fully understand the language.",
    website:
      "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond",
    coverImage:
      "https://img1.od-cdn.com/ImageType-100/2858-1/%7BA4000B88-B455-4B02-846C-F79658C14D81%7DImg100.jpg",
  },
  {
    isbn: "9781617290459",
    title: "Grokking Algorithms",
    author: "Aditya Bhargava",
    subtitle: "An illustrated guide for programmers and other curious people",
    published: "2016-04-25",
    publisher: "Manning Publications",
    pages: 256,
    description:
      "An illustrated guide to common algorithms and data structures, written in a clear, concise, and approachable manner.",
    website: "https://www.manning.com/books/grokking-algorithms",
    coverImage:
      "https://images.manning.com/360/480/resize/book/3/0b325da-eb26-4e50-8a2a-46042c647083/Bhargava-Algorithms_hires.png",
  },
  {
    isbn: "9781935182999",
    title: "Refactoring",
    author: "Martin Fowler",
    subtitle: "Improving the Design of Existing Code",
    published: "2018-11-01",
    publisher: "Addison-Wesley Professional",
    pages: 464,
    description:
      "Provides a catalog of refactorings, a framework for understanding them, and a process for safely applying them to existing code.",
    website: "http://martinfowler.com/books/refactoring.html",
    coverImage:
      "https://martinfowler.com/books/refact2.jpg",
  },
  {
    isbn: "9781449337711",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    subtitle: null,
    published: "2008-05-13",
    publisher: "O'Reilly Media",
    pages: 176,
    description:
      "Uncovers the elegant parts of JavaScript, which are essential for developing maintainable and reliable code.",
    website:
      "https://www.oreilly.com/library/view/javascript-the-good/9780596517748/",
    coverImage:
      "https://m.media-amazon.com/images/I/51iqz9lKK-L._SY445_SX342_.jpg",
  },
  {
    isbn: "1234567890",
    title: "Sample Book",
    author: "Author Name",
    bookcover: "/images/default-cover.jpg",
  },
];

module.exports = { books };