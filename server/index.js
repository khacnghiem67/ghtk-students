import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import { connectToDb, getDb } from './db/db.js';

const app = express();
const PORT = 3333;

// middlewares
app.use(cors({ origin: ['http://localhost:5500', 'http://127.0.0.1:5500'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
router(app);

// connect to db
connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('App is running on port ' + PORT);
    });
  } else {
    console.log('Can not connect to db');
  }
});

