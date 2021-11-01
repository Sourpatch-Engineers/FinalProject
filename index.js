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

app.get('/about', handlers.about)

app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})