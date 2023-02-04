import express from 'express'
import cors from 'cors'
import randomRouter from './routes/random';
import redisRouter from './routes/redis'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/hello', (_, res) => {
  res.send("Why hello to you too!")
});

app.use('/random', randomRouter);
app.use('/redis', redisRouter);

export default app;
