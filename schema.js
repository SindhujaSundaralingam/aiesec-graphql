const { gql } = require('apollo-server');

  const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.
  
    # This "Book" type can be used in other type declarations.
    type Book {
      title: String
      author: String
    }

    type OpportunityDetails {
        id: Int
        name: String
        level: Int
        option: String
    }

    type HostDetails {
        full_name: String
    }

    type LabelValue {
        label: String
        value: String
    }

    type PrerequisitiesList {
        label: String
        value: [OpportunityDetails]
    }

    type logisticsListDetails { 
        food_covered: String
        food_weekends: String
        accommodation_covered: String
        accommodation_provided: String
    }

    type Opportunity {
        id: Int
        title: String
        description: String
        location: String
        earliestStartDate: String
        latestEndDate: String
        applicationCloseDate: String
        selectionProcess: String
        city: String
        workingHours: [LabelValue]
        mainActivities: [String]
        volunteerDetails: [LabelValue]
        prerequisitesList: [PrerequisitiesList]
        visalogisticsDetails: [LabelValue]
        skills: [OpportunityDetails]
        backgrounds: [OpportunityDetails]
        host_lc: HostDetails
        logisticDetails: [LabelValue]
        legalDetails: [LabelValue]
        coverPhoto: String
        salary: String
    }

    type List {
        id: Int
        name: String
    }
  
    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        getOpportunityDetails: Opportunity
        getSkillList: [List]
        getBackgroundList: [List]
    }
    input RoleInfoDetails {
        city: String
        selection_process: String
    }
    
    input SpecificsInfoDetails {
        salary: String
    }

    input BackgroundList {
        option: String
        level: Int
        id: Int
        name: String
        key: Int
    }

    input Skillist {
        option: String
        level: Int
        id: Int
        name: String
        key: Int
    }

    input ListDetails {
        id: Int
        name: String
    }

    input UpdateOpportunityRequest {
        title: String
        description: String
        earliestStartDate: String
        latestEndDate: String
        selectionProcess: String
        salary: String
        city: String
        backgroundList: [ListDetails]
        skillList: [ListDetails]
    }

    type updateResponse {
        id: Int
    }
    type Mutation {
        updateOpportunity(input: UpdateOpportunityRequest!): updateResponse
    }
  `;
  
  module.exports = { typeDefs }
  