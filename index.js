const express = require('express')
const expressHandlebars = require('express-handlebars')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')


const handlers = require('./lib/handlers')
const db = require('./db')


//setting up dotenv config file
dotenv.config({path: './config/config.env'})

db.openConnectionDB()

//setting up passport
require('./config/passport')(passport)

const app = express()


//session middleware
/**
 * @description this will create a new mongodb table called sessions and store the current session based on the ObjectID of the user not the GoogleID
 * @note must be placed above the passport middleware
 * @note since we are using connect-mongo 4+ we have to create our mongostore this way rather than creating it in the require
 */
 app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')


//passport middleware
//Side note this MUST be before the routes are called
app.use(passport.initialize())
app.use(passport.session()) // you need express-sessions for this to work

//app.get('/', handlers.home)

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/view_teams', require('./routes/index'))


app.get('/proposal', handlers.proposal)
app.get('/team_form', handlers.team_form)
app.post('/team-form/complete', handlers.create_team)


app.get('/about', handlers.about)


app.get('/view_teams/:teamName', handlers.view_one_team)
app.get('/login', handlers.login)
app.post('/team_portal', handlers.team_portal)
app.post('/new_sprint', handlers.new_sprint)

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})