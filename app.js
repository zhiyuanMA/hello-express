require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(rateLimiter({
  windowMs: 30 * 60 * 1000,
  max: 600
}));

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));

//use routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on prot ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();