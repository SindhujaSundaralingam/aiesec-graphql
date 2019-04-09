const { 
    getOpportunity,
    getBackgroundList
} = require('./fixture')
const {
  transformOpportunityDetails,
  transformList,
  transformRequest
} = require('./transform')

const resolvers = {
  Query: {
    getOpportunityDetails: async (obj, args, { dataSources }, info) => {
          const response = await dataSources.opportunityAPI.getOpportunity()
          const transformedData = transformOpportunityDetails(response)
          return transformedData
      },
      getSkillList: async (obj, args, { dataSources }, info) => {
          const response = await dataSources.opportunityAPI.getSkills()
          const transformedData = transformList(response)
          return transformedData
      },
      getBackgroundList: async (obj, args, { dataSources }, info) => {
          const response = await dataSources.opportunityAPI.getBackgrounds()
          const transformedData = transformList(response)
          return transformedData
      },
  },
  Mutation: {
      updateOpportunity: async (obj, args, { dataSources }, info) => {
          const body = args.input
          const requestBody = transformRequest(body)
          const response = await dataSources.opportunityAPI.updateMutation(requestBody)
          console.log('Success response', response)
          return response
      }
  },
};

  module.exports = resolvers