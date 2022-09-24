const router = require('express').Router();
const habitController = require('./controllers/habit');
const ouraController = require('./controllers/ouraAPI');

router.get('/activity', ouraController.getDailyActivity);
router.get('/personal_info', ouraController.getPersonalInfo);
router.post('/habit', habitController.create);
router.get('/habit', habitController.get);
router.get('/currentHabit', ouraController.getHabitData);
router.get('/mainHabit', habitController.getMainHabit);
router.put('/mainHabit', habitController.updateMainHabit);
router.get('/averages', ouraController.getAverages);

module.exports = router;
