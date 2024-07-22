import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the app!',
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
})
