import express from 'express'
import cors from 'cors'
import randomRouter from './routes/random';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/hello', (_, res) => {
  res.send("Why hello to you too!")
})

app.use('/random', randomRouter)

// this route confirms the existence and passthrough of headers
app.get('/info', (req, res) => {
  res.setHeader('x-my-return-header-1', 'mySpclVal')
  res.setHeader('x-my-return-header-2', 'mySpclVal')
  res.setHeader('my-other-return-header', 'mySpclVal')

  res.cookie('myCookie1', 'myVal1', { httpOnly: true })
  res.cookie('myCookie2', 'myVal2', { httpOnly: true })

  const recievedHeaders = req.headers;
  res.json({ recievedHeaders })
})

export default app;
