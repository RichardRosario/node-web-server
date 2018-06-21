const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to find server');
        }
    })
    next();
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Welcome to my website!',
        currentYear: new Date().getFullYear()
    })
});
app.get('/about', (req, res, next) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
app.get('/projects', (req, res, next) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        projectList: 'Below are lists of my projects'
    });
});

app.get('/bad', (req, res) => res.json({msg: 'Bad request'}));

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});