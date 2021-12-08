const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const db = require("../db.js")

/**
 * @description main page / home page
 * @route GET /
 */
router.get('/', (req, res) => {
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    
    db.loadAllTeams().then( result => {
        console.log(result)
        res.render('index', {
            layout: logged,
            tableData: result.map(result => result.toObject())
        })
        
    
    })
})

/**
 * @description Team Portal
 * @route GET /team_portal
 * @param ensureAuth middleware that will not allow any unauthenticated users through but redirect them to landing page. 
 */
router.get('/team_portal', ensureAuth, (req, res) => {
    res.render('team_portal', {
        layout: 'logged-in',
        name: req.user.displayName
    })
})

/**
 * @description Team Form
 * @route GET /team_form
 * @param ensureAuth middleware that will not allow any unauthenticated users through but redirect them to landing page. 
 */
 router.get('/team_form', ensureAuth, (req, res) => {
    res.render('team_form', {
        layout: 'logged-in'
    })
})

/**
 * @description View Teams
 * @route Get /view_teams
 * @param @param ensureAuth middleware that will not allow any unauthenticated users through but redirect them to landing page.
 */
router.get('/view_teams', ensureAuth, (req, res) => {
    var logged;
    if(req.isAuthenticated()) {
        logged = 'logged-in'
    } else {
        logged = 'main'
    }
    db.loadAllTeams().then(result => {
        res.render('view_teams',{
            layout: logged,
            tableData: result.map(result => result.toObject())
            
        })
    })
})


module.exports = router