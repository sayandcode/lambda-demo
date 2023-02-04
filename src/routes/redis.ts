import { Router } from 'express'
import redisClient from '../services/redis'

const redisRouter = Router();

redisRouter.get('/setName/:nameVal', async (req, res) => {
  await redisClient.set('name', req.params.nameVal)
  res.send("Set successfully")
})

redisRouter.get('/getName', async (_, res) => {
  const name = await redisClient.get('name');
  const msg = name || "Couldn't find name";
  res.send(msg);
})

redisRouter.get('/deleteName', async (_, res) => {
  const delResult = await redisClient.del('name');
  const msg = delResult === 1 ? 'Deleted Successfully' : "Can't delete what doesn't exist";
  res.send(msg);
})

export default redisRouter;
