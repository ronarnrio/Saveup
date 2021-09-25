function loginPage(req,res){
    res.render('users/login', { title: '$aveUp | Login' })
}

module.exports = {
    loginPage
}