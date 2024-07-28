const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./config/db');
const User = require('./models/User');
const Form = require('./models/Form');

// Load environment variables
require('dotenv').config();

// Passport configuration
require('./config/passport')(passport);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('User already exists');
    }
    user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send('Welcome to your dashboard');
});

app.post('/form', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  const { formData } = req.body;
  try {
    const form = new Form({ user: req.user.id, formData });
    await form.save();
    res.send('Form data saved');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/form', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const forms = await Form.find({ user: req.user.id });
    res.json(forms);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
