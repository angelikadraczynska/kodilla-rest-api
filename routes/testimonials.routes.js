const express = require('express');
const db = require('../db');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  const testimonialsData = db.testimonials;
  testimonialsData.map(single => {
    if (single.id == req.params.id) {
      return res.json(single);
    }
  });
});

router.route('/testimonials/random').get((req, res) => {
  const testimonialsData = db.testimonials;
  const randomTestimonial =
    testimonialsData[Math.floor(Math.random() * testimonialsData.length)];
  return res.json(randomTestimonial);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newPost = { author: author, text: text, id: uuidv1() };
  db.testimonials.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
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

router.route('/testimonials/:id').delete((req, res) => {
  const testimonialsData = db.testimonials;
  testimonialsData.map(post => {
    if (post.id == req.params.id) {
      testimonialsData.splice(testimonialsData.indexOf(post));
    }
    res.json({ message: 'OK' });
  });
});

module.exports = router;
