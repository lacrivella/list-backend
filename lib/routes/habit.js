const { Router } = require('express');
const Habit = require('../models/Habit');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      habit,
      description,
      user
    } = req.body;

    Habit
      .create({
        habit,
        description,
        user
      })
      .then(habit => res.send(habit))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Habit
      .find()
      .then(habits => res.send(habits))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Habit
      .findById(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  })