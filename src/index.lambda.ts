import ServerlessHttp from 'serverless-http';
import app from './app'

export default (event: Object, context: Object) => {
  console.log({ event, context })
  const serverlessInstance = ServerlessHttp(app)
  return serverlessInstance(event, context)
}
