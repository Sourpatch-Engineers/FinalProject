const express = require('express')
const passport = require('passport')
const router = express.Router()

/**
 * @description  Auth with Google and define the scope specified within the consent form
 * @route        GET /auth/google/
 */
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))

/**
 * @description Google auth callback will handle redirection if passed and failureRedirect if something goes wrong
 * @route GET /auth/google/callback
*/
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), 
    (req, res) => {
        res.redirect('/')
    })

/**
 * @description Logout of googke with the built in /logout route
 * @route GET /logout
 */
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router