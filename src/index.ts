import express from 'express'
import cors from 'cors'
import randomRouter from './routes/random';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/hello', (_, res) => {
  res.send("Hello to you too!")
})
app.use('/random', randomRouter)

app.listen(8080, () => console.log("Listening on 8080"))
