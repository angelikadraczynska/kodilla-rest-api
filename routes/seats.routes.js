const express = require('express');
const db = require('../db');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seatsData = db.seats;
  seatsData.map(single => {
    if (single.id === req.params.id) {
      return res.json(single);
    }
  });
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const io = req.io;
  const seatsData = db.seats;
  let checker = true;

  seatsData.map(single => {
    if (single.day === day && single.seat === seat) {
      res.status(204).json({ message: 'The slot is already taken...' });
      checker = false;
    }
  });
  
  if (checker === true) {
    const newPost = {
      seat: seat,
      client: client,
      email: email,
      day: day,
      id: uuidv1()
    };

    seatsData.push(newPost);
    res.json({ message: 'OK' });
    io.emit('seatsUpdated', seatsData);
  }
});

router.route('/seats/:id').put((req, res) => {
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

router.route('/seats/:id').delete((req, res) => {
  const seatsData = db.seats;
  seatsData.map(post => {
    if (post.id === req.params.id) {
      seatsData.splice(seatsData.indexOf(post));
    }
    res.json({ message: 'OK' });
  });
});

module.exports = router;
