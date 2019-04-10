const { ApolloServer } = require('apollo-server');
const { typeDefs }  = require('./schema')
const resolvers = require('./resolvers')
const OpportunityAPI = require('./datasources')

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    opportunityAPI: new OpportunityAPI(),
  }),
 });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});