const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

// Controllers
const testJwtRouter = require('./controllers/test-jwt');
const authCtrl = require('./controllers/auth');
const usersCtrl = require('./controllers/users');
// Routers
const dashboardRoutes = require('./routes/dashboardRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const eventRoutes = require('./routes/eventRoutes');

// MiddleWare
const verifyToken = require('./middleware/verify-token');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Public
app.use('/auth', authCtrl);
app.use('/test-jwt', testJwtRouter);

// Protected Routes
app.use(verifyToken);
app.use('/users', usersCtrl);
<<<<<<< HEAD
app.use('/events', eventsCtrl)
app.use('/applications', applicationsCtrl)
app.use('/feedback', feedbackRoutes);
=======
app.use('/events', eventRoutes)
app.use('/dashboard', dashboardRoutes);
app.use('/applications', applicationRoutes)
>>>>>>> 566488501ed6ed74ff488b7f40783a5c016c4dc9

app.listen(PORT, () => {
  console.log('The express app is ready!');
});
