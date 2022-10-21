const router = require('express').Router();
const habitController = require('./controllers/habit');
const ouraController = require('./controllers/ouraAPI');
const authController = require('./controllers/authentication');

//Oura
router.get('/activity', ouraController.getDailyActivity);
router.get('/personal_info', ouraController.getPersonalInfo);
router.get('/averages', ouraController.getAverages);
router.get('/currentHabit', ouraController.getHabitData);

//Habits
router.post('/habit', habitController.create);
router.get('/habit', habitController.get);
router.get('/mainHabit', habitController.getMainHabit);
router.put('/mainHabit', habitController.updateMainHabit);
router.get('/validateHabit', habitController.validateHabit);
router.delete('/deleteHabit', habitController.deleteHabit);

//Authenitcation
router.get('/callback', authController.handleCallback);
router.get('/auth', authController.oAuthRequest);

module.exports = router;
