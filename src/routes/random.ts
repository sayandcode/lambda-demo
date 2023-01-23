import { Router } from 'express'
import crypto from 'node:crypto'

const randomRouter = Router();

randomRouter.get('/number', (_, res) => {
  const randomNum = Math.floor(Math.random() * 1000);
  res.send(randomNum.toString());
})

randomRouter.get('/string', (_, res) => {
  const randomStr = crypto.randomUUID();
  res.send(randomStr)
})

export default randomRouter;
