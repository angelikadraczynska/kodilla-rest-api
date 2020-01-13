const express = require('express');
const db = require('../database');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/:id').get((req, res) => {
  const testimonialsData = db.testimonials;
  testimonialsData.map(single => {
    if (single.id == req.params.id) {
      return res.json(single);
    }
  });
});

router.route('/random').get((req, res) => {
  const testimonialsData = db.testimonials;
  const randomTestimonial =
    testimonialsData[Math.floor(Math.random() * testimonialsData.length)];
  return res.json(randomTestimonial);
});

router.route('/').post((req, res) => {
  const { author, text } = req.body;
  const newPost = { author: author, text: text, id: uuidv1() };
  db.testimonials.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/:id').put((req, res) => {
  const { author, text } = req.body;
  const testimonialsData = db.testimonials;
  testimonialsData.map(post => {
    if (post.id == req.params.id) {
      post.author = author;
      post.text = text;
    }
    res.json({ message: 'OK' });
  });
});

router.route('/:id').delete((req, res) => {
  const testimonialsData = db.testimonials;
  testimonialsData.map(post => {
    if (post.id == req.params.id) {
      testimonialsData.splice(testimonialsData.indexOf(post));
    }
    res.json({ message: 'OK' });
  });
});

module.exports = router;
