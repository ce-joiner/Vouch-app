const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require("connect-mongo");

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const listsController = require('./controllers/lists.js');
const authController = require('./controllers/auth.js');
const placesController = require('./controllers/places.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// MIDDLEWARE 

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// SESSION 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);


// ROUTES 

app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/lists', listsController);
app.use('/users/:userId/lists/:listId/places', placesController);



app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});