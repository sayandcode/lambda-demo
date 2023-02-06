import express from 'express'
import cors from 'cors'
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/hello', (req, res) => {
  const { connectionId } = req.body;
  if (typeof connectionId !== 'string') {
    res.status(400).send("Couldn't find connection Id in body")
    return;
  }
  const msg = `Why hello to you too, connectionId:${connectionId}`;
  console.log("Msg from hello:", msg)
  res.send(msg)
})

app.post('/randomNumUnder', (req, res) => {
  const { num, connectionId } = req.body
  if (typeof connectionId !== 'string') {
    res.status(400).send("Couldn't find connection Id in body")
    return
  }
  if (typeof num !== 'number') {
    res.status(400).send("Send a number in the body");
    return;
  }
  const randomNum = Math.random() * num
  res.json({ connectionId, randomNum })
})

const apiGwReplyEndpoint = process.env['WS_REPLY_ENDPOINT'];
if (!apiGwReplyEndpoint) throw new Error("Api Gateway Websocket reply endpoint not configured")
const replyClient = new ApiGatewayManagementApiClient({ endpoint: apiGwReplyEndpoint })

app.get("/reply/:connId/:msg", async (req, res) => {
  const { connId, msg } = req.params;
  const cmd = new PostToConnectionCommand({
    ConnectionId: connId,
    Data: msg as any,
  })
  try {
    await replyClient.send(cmd)
    res.send("Message sent to websocket")
  } catch (err) {
    res.send(err)
  }
})


export default app;
