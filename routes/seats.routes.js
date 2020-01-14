const express = require('express');
const db = require('../database');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/').get((req, res) => {
  res.json(db.seats);
});

router.route('/:id').get((req, res) => {
  const seatsData = db.seats;
  seatsData.map(single => {
    if (single.id === req.params.id) {
      return res.json(single);
    }
  });
});

router.route('/').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newPost = {
    seat: seat,
    client: client,
    email: email,
    day: day,
    id: uuidv1()
  };
  db.seats.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const seatsData = db.seats;
  seatsData.map(post => {
    if (post.id === req.params.id) {
      post.seat = seat;
      post.client = client;
      post.email = email;
      post.day = day;
    }
    res.json({ message: 'OK' });
  });
});

router.route('/:id').delete((req, res) => {
  const seatsData = db.seats;
  seatsData.map(post => {
    if (post.id === req.params.id) {
      seatsData.splice(seatsData.indexOf(post));
    }
    res.json({ message: 'OK' });
  });
});

module.exports = router;
