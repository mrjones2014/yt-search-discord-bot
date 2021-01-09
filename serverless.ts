import type { AWS } from '@serverless/typescript';
import { YtFunctionHandler } from "./src/functions/yt";
import ytFunctionSchema from "./src/utils/yt-function-schema";


const serverlessConfiguration: AWS = {
  org: "mjonesnetwork",
  app: "yt-search-discord-bot",
  service: 'yt-search-discord-bot',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    yt: {
      handler: YtFunctionHandler,
      events: [
        {
          http: {
            method: "post",
            path: "yt",
            integration: "LAMBDA",
            request: {
              schema: {
                "application/json": ytFunctionSchema,
              }
            }
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
