const Concerts = require('../models/concerts.model');
const Seats = require('../models/seats.model');

exports.getAll = async (req, res) => {
  try {
    const seats = Seats.find();
    const numberOfSeats = 50;
    const ticketsNumber = numberOfSeats - (await seats).length;

    await Concerts.updateMany({day: { $eq: 1 }}, { $set: { tickets: ticketsNumber }});

    res.json(await Concerts.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const con = await Concerts.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concerts({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    await Concerts.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image
        }
      }
    );
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const con = await Concerts.findById(req.params.id);
    if (con) {
      await Concerts.findOneAndRemove({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
