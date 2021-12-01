const db = require("../db.js")
const ehb = require("express-handlebars")
const {checkAuth} = require("../middleware/auth")

/* Handlers Functions*/

/* Index Functions */
var hbs = ehb.create({})
// hbs.handlebars.registerHelper("concat_members", function(members_list) {
//     /* Takes an array of members to concatenate into a string */
//     var members_string = members_list.join(", ")
//     return members_string
// })
exports.home = (req, res) => {
    /* Load all teams data before making page */    
    db.loadAllTeams().then( result => {
        console.log(result)
        res.render('index', {
            tableData: result
        })
    })
}

exports.team_portal = (req, res) => {
    console.log(req.body.teamName)
    db.loadTeam(req.body.teamName).then( result => {
        data = result
        console.log(data)
        res.render('team_portal', {
            team_name: data.teamName,
            member_names: data.members,
            product_owner: data.scrumMaster,
            sprints: data.sprints                      
        })
        
    })
}

exports.proposal = (req, res) => res.render('proposal')

exports.team_form = (req, res) => res.render('team_form')

exports.about = (req, res) => res.render('about')

exports.login = (req, res) => res.render('login')



exports.view_one_team = (req, res) => {
    db.loadTeam(req.params.teamName).then( result => {
        res.render('view_one_team', {
            team_name: result.team_name,
            member_names: result.member_names,
            scrum_master: result.scrum_master
        })
    })
}


exports.view_teams = (req, res, next) => {    
    db.loadAllTeams().then(result => {
        res.render('view_teams',{
            tableData: result.map(result => result.toObject())
            
        })
    })
    
    
    

    
}

exports.create_team = (req, res) => {
    var teamName = req.body.team
    var scrum_master = req.body.master
    var member_names = req.body.members
    var member_names = member_names.split(',');
    console.log(teamName)
    console.log(scrum_master)
    console.log(member_names)
    db.insertTeam(teamName, member_names, scrum_master)
    res.render('complete', {
        TeamName: teamName
    })
}

exports.new_team = (req, res) => {
    
    res.redirect('back');
}