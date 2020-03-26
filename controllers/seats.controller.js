const Seats = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postSeat = async (req, res) => {
  const { day, seat, client, email } = sanitize(req.body);
  const io = req.io;
  try {
    const newConcert = new Seats({
      day: day,
      seat: seat,
      client: client,
      email: email
    });
    await newConcert.save();
    res.json({ message: 'OK' });
    io.emit('seatsUpdated', seatsData);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editSeat = async (req, res) => {
    const { day, seat, client, email } = sanitize(req.body);

  try {
    await Seats.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            day: day,
            seat: seat,
            client: client,
            email: email
        }
      }
    );
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if (seat) {
      await Seats.findOneAndRemove({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json(err);
  }
};
