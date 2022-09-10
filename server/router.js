const router = require('express').Router();
const { getDailyActivity, getPersonalInfo } = require('./controllers/index');

router.get('/activity', getDailyActivity);
router.get('/personal_info', getPersonalInfo);

module.exports = router;
