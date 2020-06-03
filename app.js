// Initialize express
const express = require('express')
const app = express()
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const models = require('./db/models');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


// INDEX
app.get('/', (req, res) => {
    //res.send('Hello Peanut!')
    //res.render('home', { msg: 'Handlebars are Cool!' });
    //res.render('events-index', { events: events });
    //models.Event.findAll().then(events => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
        res.render('events-index', { events: events });
    })
})

// Create
app.get('/events/new', (req, res) => {
    res.render('events-new', {});
})
// Recieve info from CREATE
app.post('/events', (req, res) => {
    //console.log(req.body);
    models.Event.create(req.body).then(event => {
        //res.redirect(`/`);
        // Redirect to events/:id
        res.redirect(`/events/${event.id}`)
    }).catch((err) => {
        console.log(err)
    });
})

// SHOW
app.get('/events/:id', (req, res) => {
    //res.send('I\'m an event')
    // Search for the event by its id that was passed in via req.params
    models.Event.findByPk(req.params.id).then((event) => {
      // If the id is for a valid event, show it
      res.render('events-show', { event: event })
    }).catch((err) => {
      // if they id was for an event not in our db, log an error
      console.log(err.message);
    })
});

// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
  ]


// require handlebars
var exphbs = require('express-handlebars');
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

