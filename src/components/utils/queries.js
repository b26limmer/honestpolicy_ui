import { gql } from '@apollo/client';
export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        email
        authenticationToken
        firstName
      }
      clientMutationId
      errors
      success
      token
    }
  }
`;
export const SELECT_QUOTE = gql`
  mutation selectQuote($input: SelectQuoteInput!) {
    selectQuote(input: $input) {
      errors
      success
      result
    }
  }
`;
export const SELECT_HOME_QUOTE = gql`
  mutation selectHomeQuote($input: SelectHomeQuoteInput!) {
    selectHomeQuote(input: $input) {
      errors
      success
      result
    }
  }
`;
export const SELECT_RENTER_QUOTE = gql`
  mutation selectRenterQuote($input: SelectRenterQuoteInput!) {
    selectRenterQuote(input: $input) {
      errors
      success
      result
    }
  }
`;
export const POLICIES = gql`
  query usersPolicies($policyType: String) {
    usersPolicies(policyType: $policyType) {
      nodes {
        id
        insuranceName
        carrierId
        policyNumber
        firstName
        lastName
        otherPeopleCovered
        carsInsured
        costPerMonth
        coverageBeginDate
        carrier {
          id
          slug
          name
        }
        coverageEndDate
        bodilyInjuryLiability
        propertyDamageLiability
        uninsuredMotorist
        comprehensive
        collision
        medicalPayments
        personalInjuryProtection
        additionalNotes
        emergencyRoadside
        addons
        policyType
        insuranceOptions
        carrierOptions
        addresses {
          streetName
          city
          state
          zip
        }
      }
    }
  }
`;
export const GET_REVIEW = gql`
  query reviewsData {
    reviews(byCurrentUser: true) {
      nodes {
        id
        overall
        carrierId
        claimSatisfaction
        stars
        customerService
        recommend
        review
        createdAt
        userState
        lineOfBusiness
        cachedWeightedAverage
        priceValue
        user {
          firstName
          lastName
        }
        carrier {
          name
        }
      }
    }
  }
`;
export const CARRIER_REVIEWS = gql`
  query reviews($carrierId: ID) {
    reviews(carrierId: $carrierId) {
      nodes {
        carrierId
        claimSatisfaction
        customerService
        id
        overall
        stars
        lineOfBusiness
        priceValue
        recommend
        review
        createdAt
        userState
        cachedWeightedAverage
        user {
          firstName
          lastName
        }
        votesFor {
          voter {
            id
          }
          voteFlag
        }
      }
    }
  }
`;
export const QUOTEFORMDATA = gql`
  query usersQuoteFormdata {
    usersQuoteFormdata {
      nodes {
        id
        demography
        details
        updates
        security
        history
        options
        qtype
      }
    }
  }
`;
export const GET_RATES = gql`
  mutation getQuoteRates($input: GetQuoteRatesInput!) {
    getQuoteRates(input: $input) {
      errors
      rates
      success
    }
  }
`;
export const GET_HOME_RATES = gql`
  mutation getHomeQuoteRates($input: GetHomeQuoteRatesInput!) {
    getHomeQuoteRates(input: $input) {
      errors
      rates
      success
    }
  }
`;
export const GET_RENTER_RATES = gql`
  mutation getRenterQuoteRates($input: GetRenterQuoteRatesInput!) {
    getRenterQuoteRates(input: $input) {
      errors
      rates
      success
    }
  }
`;

export const LIST_QUOTES = gql`
  mutation listQuotes($input: ListQuoteInput!) {
    listQuote(input: $input) {
      quotes
    }
  }
`;
export const CREATE_QUOTE = gql`
  mutation createQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      errors
      quote
      success
    }
  }
`;
export const CREATE_HOME_QUOTE = gql`
  mutation createHomeQuote($input: CreateHomeQuoteInput!) {
    createHomeQuote(input: $input) {
      errors
      quote
      success
    }
  }
`;
export const CREATE_RENTER_QUOTE = gql`
  mutation createRenterQuote($input: CreateRenterQuoteInput!) {
    createRenterQuote(input: $input) {
      errors
      quote
      success
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut(input: {}) {
      errors
      success
    }
  }
`;
export const CREATE_POLICY = gql`
  mutation createPolicy($input: CreatePolicyInput!) {
    createPolicy(input: $input) {
      policy {
        id
        insuranceName
        carrierId
        policyNumber
        firstName
        lastName
        otherPeopleCovered
        carsInsured
        costPerMonth
        coverageBeginDate
        coverageEndDate
        bodilyInjuryLiability
        propertyDamageLiability
        uninsuredMotorist
        comprehensive
        collision
        medicalPayments
        personalInjuryProtection
        additionalNotes
        emergencyRoadside
        addons
        policyType
        insuranceOptions
        carrierOptions
        addresses {
          streetName
          city
          state
          zip
        }
      }
      success
      errors
    }
  }
`;

export const CREATE_LEAD = gql`
  mutation createLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      errors
      lead {
        id
        leadId
        quoteType
      }
      success
    }
  }
`;
