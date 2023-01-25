import express from 'express'
import cors from 'cors'
import randomRouter from './routes/random';
import ServerlessHttp from 'serverless-http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/hello', (_, res) => {
  res.send("Why hello to you too!")
})
app.use('/random', randomRouter)

export default ServerlessHttp(app)
