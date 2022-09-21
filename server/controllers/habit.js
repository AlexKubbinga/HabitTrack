const Habit = require('../models/habit'); // can be used to create habits.
const { createDateArray } = require('../utils/date');

const create = async (req, res) => {
  try {
    console.log('creating a new habit');
    const { start_date, length } = req.body;
    const dates = createDateArray(start_date, length);
    const habit = new Habit({ ...req.body, dates });
    console.log(habit);
    const savedHabit = await habit.save();
    res.status = 200;
    res.send('Habit successfully created');
  } catch (error) {
    res
      .status(500)
      .send(
        'There was an error in creating a new habit. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

const get = async (req, res) => {
  try {
    console.log('getting habits');
    const habits = await Habit.find();
    res.status = 200;
    res.send(habits);
  } catch (error) {
    res
      .status(500)
      .send(
        'There was an error in getting the habits. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

module.exports = { create, get };
