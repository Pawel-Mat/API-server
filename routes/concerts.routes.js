const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
});

router.route('/concerts/:id').get((req, res) => {
  if (req.params.id == 'random') {
    res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
  } else {
    res.json(db.concerts.filter(item => item.id == req.params.id));
  }
});

  router.route('/concerts').post((req, res) => {
    const {genre, performer, price, day, image} = req.body;
    const add = {
      id: uuidv4(),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    };
    db.concerts.push(add);
    res.json({ message: 'OK' });
  });

  router.route('/concerts/:id').put((req, res) => {
    const {performer, genre, price, day, image} = req.body;

    const changeTestimonial = {
        id: req.params.id,
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    }

    const item = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(item);
    db.concerts[index] = changeTestimonial;
    res.json({message: 'OK'});
  });

  router.route('/concerts/:id').delete((req, res) => {
    const item = db.concerts.filter(item => item.id == req.params.id);
    const index = db.concerts.indexOf(item);
    db.concerts.splice(index, 1);
    res.json({ message: 'OK'});
  });

module.exports = router;