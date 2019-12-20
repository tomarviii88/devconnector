const express = require('express');
const app = express();
const connectDB = require('./config/db');

app.get('/', (req, res) => res.send('API Running'));

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['*']);
  next();
});
PORT = 5000;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
