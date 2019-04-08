const { 
    getOpportunity,
    getBackgroundList
} = require('./fixture')


const resolvers = {
    Query: {
      getOpportunityDetails: () => getOpportunity,
    //   getBackgroundList: () => getBackgroundList,
    //   getSkillsList: () => ''
    }
  };

  module.exports = resolvers