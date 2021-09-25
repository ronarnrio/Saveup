var express = require('express');
var router = express.Router();

const goalsCtrl = require('../controllers/goals')

// Render page where all goals will be and get all goals
router.get('/showall', goalsCtrl.getAll);

router.get('/new', goalsCtrl.createGoalForm)

router.post('/new', goalsCtrl.createGoal)

router.get('/details/:id', goalsCtrl.getDetails)

router.get('/editgoal/:id', goalsCtrl.editGoalForm)

router.post('/editgoal/:id', goalsCtrl.updateGoal)

router.get ('/remove/:id', goalsCtrl.deleteGoal)
module.exports = router;