const express = require('express');
const db = require('../database');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/').get((req, res) => {
  res.json(db.concerts);
});

router.route('/:id').get((req, res) => {
  const concertsData = db.concerts;
  concertsData.map(single => {
    if (single.id === req.params.id) {
      return res.json(single);
    }
  });
});

router.route('/').post((req, res) => {
  const { performer, genre, price, day } = req.body;
  const newPost = {
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    id: uuidv1()
  };
  db.concerts.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/:id').put((req, res) => {
  const { performer, genre, price, day } = req.body;
  const concertsData = db.concerts;
  concertsData.map(post => {
    if (post.id === req.params.id) {
      post.performer = performer;
      post.genre = genre;
      post.price = price;
      post.day = day;
    }
    res.json({ message: 'OK' });
  });
});

router.route('/:id').delete((req, res) => {
  const concertsData = db.concerts;
  concertsData.map(post => {
    if (post.id === req.params.id) {
      concertsData.splice(concertsData.indexOf(post));
    }
    res.json({ message: 'OK' });
  });
});

module.exports = router;
