const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/seats').get((req, res) => {
  res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => {
  if (req.params.id == 'random') {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
  } else {
    res.json(db.seats.filter(item => item.id == req.params.id));
  }
});

  router.route('/seats').post((req, res) => {
    const {day, seat, client, email} = req.body;
    const add = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email,
    };
    db.seats.push(add);
    res.json({ message: 'OK' });
  });

  router.route('/seats/:id').put((req, res) => {
    const {day, seat, client, email} = req.body;

    const changeTestimonial = {
        id: req.params.id,
        day: day,
        seat: seat,
        client: client,
        email: email,
    }

    const item = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(item);
    db.seats[index] = changeTestimonial;
    res.json({message: 'OK'});
  });

  router.route('/seats/:id').delete((req, res) => {
    const item = db.seats.filter(item => item.id == req.params.id);
    const index = db.seats.indexOf(item);
    db.seats.splice(index, 1);
    res.json({ message: 'OK'});
  });

module.exports = router;