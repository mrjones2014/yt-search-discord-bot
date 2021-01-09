import schema from './yt/schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/yt/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'yt',
        integration: "LAMBDA",
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}