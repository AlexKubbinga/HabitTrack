const Habit = require('../models/habit'); // can be used to create habits.
const { createDateArray, getEndDate } = require('../utils/date');

const create = async (req, res) => {
  try {
    const { name, start_date, length } = req.body;
    // already exists check
    const exists = await Habit.exists({ name });
    if (exists) {
      res.status(409).send(false);
      return;
    }
    const end_date = getEndDate(start_date, length);
    const dates = createDateArray(start_date, length);
    const habit = new Habit({ ...req.body, end_date, dates });
    const savedHabit = await habit.save();
    res.status = 200;
    res.send(JSON.stringify(req.body));
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
    console.log(habits);
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

const validateHabit = async (req, res) => {
  try {
    const { habit_name } = req.query;
    const exists = await Habit.findOne({ name: habit_name });
    if (exists) {
      res.status(200).send(false); // can't create
      return;
    }
    res.status(200).send(true);
  } catch (error) {
    res
      .status(400)
      .send(
        'There was an error in validating the habit. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

const getMainHabit = async (req, res) => {
  try {
    const habits = await Habit.find();

    const result = habits.filter((habit) => {
      return habit.main_habit;
    });
    res.status = 200;
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send(
        'There was an error in getting the main habit. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

const updateMainHabit = async (req, res) => {
  try {
    const { oldMain, newMain } = req.body;

    const old = await Habit.findOneAndUpdate(
      { name: oldMain },
      { main_habit: false }
    );
    const newHabit = await Habit.findOneAndUpdate(
      { name: newMain },
      { main_habit: true }
    );

    res.status = 200;
    res.send(newHabit);
  } catch (error) {
    res
      .status(500)
      .send(
        'There was an error in getting the habits. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { habit_name } = req.query;
    const result = await Habit.deleteOne({ name: habit_name });
    res.status = 200;
    res.send(result);
  } catch (error) {
    res
      .status(500)
      .send(
        'There was an error in deleting the habit. Sorry thats all we know.'
      );
    console.log('ERROR: ', error);
  }
};

module.exports = {
  create,
  get,
  getMainHabit,
  updateMainHabit,
  validateHabit,
  deleteHabit,
};
