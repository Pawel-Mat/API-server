const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials)
});

router.route('/testimonials/:id').get((req, res) => {
  if (req.params.id == 'random') {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  } else {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
  }
});

router.route('/testimonials').post((req, res) => {
  const {text, author} = req.body;
  const add = {
    id: uuidv4(),
    author: author,
    text: text,
  };
  db.testimonials.push(add);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const {author, text} = req.body;

  const changeTestimonial = {
      id: req.params.id,
      author: author,
      text: text
  }

  const item = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item);
  db.testimonials[index] = changeTestimonial;
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  const item = db.testimonials.filter(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK'});
});

module.exports = router;