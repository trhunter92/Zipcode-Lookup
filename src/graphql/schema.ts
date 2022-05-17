import { gql } from 'apollo-server'

export const typeDefs = gql`

  type ZipInfo {
    postCode: String
    country: String
    countryAbbreviation: String
    places: [Place]
  }

  type Place {
    placeName: String
    longitude: String
    latitude: String
    state: String
    stateAbbreviation: String
  }

  input GetZipInfoInput {
    zip: String!
    countryCode: String!
  }

  type Query {
    getZipInfo(input: GetZipInfoInput!): ZipInfo
  }
`;