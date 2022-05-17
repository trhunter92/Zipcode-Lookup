import { server } from "./graphql/server"

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});