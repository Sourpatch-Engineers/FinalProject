const showTeams = require("./showTeams")

/* Handlers Functions*/

exports.home = (req, res) => {
    var table = showTeams.create_table()
    res.render('index', {
        teamsTable: table
    })

}

exports.proposal = (req, res) => res.render('proposal')

<<<<<<< HEAD
exports.proposal = (req, res) => res.render('proposal')

exports.team_form = (req, res) => res.render('team_form')
=======
exports.about = (req, res) => res.render('about')
>>>>>>> ae5f396aa6d5d92b0bd93a9fd48e88c855d2ba42
