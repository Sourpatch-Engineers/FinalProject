const db = require("../db.js")
const ehb = require("express-handlebars")
const {checkAuth} = require("../middleware/auth")
const { isNull } = require("util")

/* Handlers Functions*/

/* Index Functions */
var hbs = ehb.create({})
// hbs.handlebars.registerHelper("concat_members", function(members_list) {
//     /* Takes an array of members to concatenate into a string */
//     var members_string = members_list.join(", ")
//     return members_string
// })

hbs.handlebars.registerHelper("log", function(that) {
        console.log(that)
    })

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
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    console.log(req.body.teamName)
    db.loadTeam(req.body.teamName).then( result => {
        data = result
        console.log(data)
        res.render('team_portal', {
            team_name: data.teamName,
            member_names: data.members,
            product_owner: data.scrumMaster,
            sprints: data.sprints,
            layout: logged                    
        })
        
    })
}

exports.proposal = (req, res) =>  {
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    
    res.render('proposal', {
        layout: logged
    })
}

exports.team_form = (req, res) => {
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    
    res.render('team_form', {
        layout: logged
    })
}

exports.about = (req, res) => {
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    
    res.render('about', {
        layout: logged
    })
}

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
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    console.log(req.body)
    var teamName = req.body.TeamName
    var scrum_master = req.body.ScrumMaster
    var member_names = req.body.members
    var member_names = member_names.split(',');
    var logged;
    db.insertTeam(teamName, member_names, scrum_master, 0)
    res.render('complete', {
        TeamName: teamName,
        layout: logged
    })
}

exports.new_sprint

exports.new_sprint = (req, res) => {
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    var sprints;
    var counter;
    var teamName = req.body.teamName;
    var scrum_master;
    var member_names;
    db.loadTeam(teamName).then(result =>{
        counter = result.sprints.length + 1
        scrum_master = result.scrumMaster,
        member_names = result.members
        var memberData = []
        for (let i = 0; i < member_names.length; i++) {
            memberData.push({
                name: member_names[i],
                stars: 0,
                points: 0})
            console.log(memberData)
        }

        db.new_sprint(teamName, memberData, counter).then(result =>{

        
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
    })
    

    
})
}
