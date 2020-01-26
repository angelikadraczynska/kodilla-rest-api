const Testimonials = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonials.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonials.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postTestimonial = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonials = new Testimonials({
      author: author,
      text: text
    });
    await newTestimonials.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editTestimonial = async (req, res) => {
  const { author, text } = req.body;
  try {
    await Testimonials.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          author: author,
          text: text
        }
      }
    );
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const tes = await Testimonials.findById(req.params.id);
    if (tes) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
