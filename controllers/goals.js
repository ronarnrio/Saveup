const Goal = require('../models/goal').Goal

const User = require('../models/user')

function getAll(req, res) {
    Goal.find({}, function (err, goals) {
        res.render('goals/showgoals', { title: '$aveUp | Goals', goals })
    })
};

function createGoalForm(req, res) {
    res.render('goals/newgoal', { title: '$aveUp | New goal' });
};

async function createGoal(req, res) {
    const goal = new Goal(req.body)

    let user = await User.findById(req.user._id)

    user.goals.push(goal)

    await user.save()

    goal.save(function(err){

        if (err) console.log(err)

        res.redirect('/goals/showall')
    })
};

async function getDetails (req, res) {
    let user = await User.findById(req.user._id)

    let goals = user.goals.id(req.params.id)

    res.render('goals/goaldetails', { goals, title: '$aveUp | Goal details' })
};

async function editGoalForm(req,res){
    let user = await User.findById(req.user._id)

    let goals = user.goals.id(req.params.id)

    res.render('goals/editgoal', { goals, title: '$aveUp | Edit goal' })
}

async function updateGoal(req, res){
    let user = await User.findById(req.user._id)

    let goal = user.goals.id(req.params.id)

    goal.name = req.body.name

    goal.description = req.body.description

    goal.cost = req.body.cost

    goal.deposit = req.body.deposit

    await user.save()

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,

        description: req.body.description,

        cost: req.body.cost,
        
        deposit: req.body.deposit
    })
    await updateGoal.save()

    res.redirect('/goals/showall')
}

async function deleteGoal (req, res){
    let user = await User.findById(req.user._id)

    user.goals.id(req.params.id).remove()

    await user.save()

    await Goal.deleteOne({ 
        _id: req.params.id
    });

    res.redirect("/goals/showall")
}

module.exports = {
    getAll,
    createGoalForm,
    createGoal,
    getDetails,
    editGoalForm,
    updateGoal,
    deleteGoal,
}