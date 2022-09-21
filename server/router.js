const router = require('express').Router();
const { getDailyActivity, getPersonalInfo } = require('./controllers/index');
const habitController = require('./controllers/habit');

router.get('/activity', getDailyActivity);
router.get('/personal_info', getPersonalInfo);
router.post('/habit', habitController.create);
router.get('/habit', habitController.get);

module.exports = router;
