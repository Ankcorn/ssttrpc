import {
  StackContext,
  use,
  Api as ApiGateway,
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    cors: true,
    defaults: {
      function: {
        permissions: [db],
        environment: {
          TABLE_NAME: db.tableName,
        },
      },
    },
    routes: {
      "GET /trpc/{path+}": "functions/trpc.handler",
      "POST /trpc/{path+}": "functions/trpc.handler"
    }
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
