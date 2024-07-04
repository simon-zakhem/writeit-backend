const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGO_URL);

//routes
const auth = require('./routes/auth');
const post = require('./routes/postRoutes');
const comm = require('./routes/commentRoutes');
const prof = require('./routes/profileRoutes');

app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/comment', comm);
app.use('/api/profile', prof);

app.listen(process.env.APP_PORT, () => {
    console.log('Running on port 3001');
});