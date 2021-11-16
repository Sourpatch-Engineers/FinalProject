const db = require("../db.js")
const ehb = require("express-handlebars")

/* Handlers Functions*/

/* Index Functions */
var hbs = ehb.create({})
hbs.handlebars.registerHelper("concat_members", function(members_list) {
    /* Takes an array of members to concatenate into a string */
    var members_string = members_list.join(", ")
    return members_string
})
exports.home = (req, res) => {
    /* Load all teams data before making page */
    db.loadAllData().then( result => {
        res.render('index', {
            tableData: result
        })
    })
}

exports.proposal = (req, res) => res.render('proposal')

exports.team_form = (req, res) => res.render('team_form')

exports.about = (req, res) => res.render('about')

exports.login = (req, res) => res.render('login')

exports.view_one_team = (req, res) => {
    db.loadMetaData(req.params.teamName).then( result => {
        res.render('view_one_team', {
            team_name: result.team_name,
            member_names: result.member_names,
            scrum_master: result.scrum_master
        })
    })
}


exports.view_teams = (req, res) => {
    db.loadAllData().then(result => {
        res.render('view_teams',{
            tableData:result
        })
    })
}