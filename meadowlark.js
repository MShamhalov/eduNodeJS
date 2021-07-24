const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', expressHandlebars({
	defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000
const fortune = require('./lib/fortune')

//
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => res.render('home'))

app.get('/about', (req, res) => {
	res.render('about', { fortune: fortune.getFortune() })
})

app.use((req, res) => {
	res.status(404)
	res.render('404')
})

app.use((err, req, res, next) => {
	console.error(err.message)
	res.status(500)
	res.send('500')
})

app.listen(port, () => console.log(
	`Express запущен на http:/127.0.0.1:${port}; ` + 
	`\n\nнажмите Ctrl + C для завершения.` 
))
