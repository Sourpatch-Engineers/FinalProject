const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')

/**
 * @description main page / home page
 * @route GET /
 */
router.get('/', (req, res) => {
    res.render('index')
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

module.exports = router