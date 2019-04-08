const { gql } = require('apollo-server');

  const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.
  
    # This "Book" type can be used in other type declarations.
    type Book {
      title: String
      author: String
    }

    type OpportunityDetails {
        id: String
        name: String
    }

    type HostDetails {
        full_name: String
    }

    type LogisticsDetails {
        food_covered: String
        food_weekends: String
        accommodation_covered: String
        accommodation_provided: String
    }

    type LegalDetails {
        visa_link: String
        visa_type: String
        visa_duration: String
        health_insurance_info: String
    }

    type SalaryDetails {
        salary: String
    }

    type Opportunity {
        id: Int
        title: String
        location: String
        description: String
        duration: Int
        earliest_start_date: String
        latest_end_date: String
        applications_close_date: String
        applications_count: Int
        nationalities: [OpportunityDetails]
        skills: [OpportunityDetails]
        backgrounds: [OpportunityDetails]
        languages: [OpportunityDetails]
        measure_of_impacts: [OpportunityDetails]
        host_lc: HostDetails
        logistics_info: LogisticsDetails
        legal_info: LegalDetails
        cover_photo_urls: String
        specifics_info: SalaryDetails
    }
  
    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        getOpportunityDetails: Opportunity
    }
  `;
  
  module.exports = { typeDefs }
  