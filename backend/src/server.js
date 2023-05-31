const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the login page');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform validation or authentication checks here
  // For simplicity, let's assume username is 'admin' and password is 'password'
  if (username === 'admin' && password === 'password') {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.send('Welcome to the dashboard');
  } else {
    res.redirect('/');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
