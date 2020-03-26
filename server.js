const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
var cors = require('cors');
const config = require('config');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/leftnav', require('./routes/api/leftnav'));
app.use('/api/categories', require('./routes/api/categories'));

app.use('/api/leftnav', require('./routes/api/leftnav'));
app.use('/api/categories', require('./routes/api/categories'));
//send email
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const { sendEmail } = require('./routes/api/mail');

app.post('/api/sendMail', (req, res) => {
  console.log(req.body);

  const adminEmail = config.get('adminEmail');
  const adminEmailPass = config.get('adminEmailPass');

  console.log(adminEmail);
  console.log(adminEmailPass);

  sendEmail(req.body.email, req.body.name, adminEmail, adminEmailPass, 'hello');
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
