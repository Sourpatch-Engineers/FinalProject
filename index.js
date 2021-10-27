const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')

const port = process.env.port || 3000


app.get('/', (req, res) => { res.render('index') })
app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})