const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')

const port = process.env.port || 3000


app.get('/', handlers.home)

app.get('/proposal', handlers.proposal)
app.get('/team_form', handlers.team_form)
app.post('/team-form/complete', handlers.create_team)


app.get('/about', handlers.about)

app.get('/view_teams', handlers.view_teams)
app.get('/view_teams/:teamName', handlers.view_one_team)
app.get('/login', handlers.login)
app.post('/team_portal', handlers.team_portal)
app.get('/new-team', handlers.new_team)


app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})