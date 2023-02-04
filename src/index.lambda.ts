import ServerlessHttp from 'serverless-http';
import app from './app'

export const handler = (event: Object, context: Object) => {
  const serverlessInstance = ServerlessHttp(app)
  return serverlessInstance(event, context)
}
