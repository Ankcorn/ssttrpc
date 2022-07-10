import * as trpc from '@trpc/server';
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import * as article from "../core/article"
import { z } from 'zod';

const appRouter = trpc.router().query('listArticles', {
  async resolve() {
    return article.list();
  }
}).mutation('createArticle', {
    input: z.object({
        url: z.string(),
        title: z.string(),
    }),
    async resolve({ input }) {
        return article.create(input.title, input.url)
    }
});

// export type definition of API
export type AppRouter = typeof appRouter;

const createContext = ({
    event,
    context,
  }: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context

type Context = trpc.inferAsyncReturnType<typeof createContext>;
  
export const handler = awsLambdaRequestHandler({
router: appRouter,
createContext,
})
