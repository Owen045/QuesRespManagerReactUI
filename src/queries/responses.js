import { gql } from "apollo-boost";


const RESPONSES = gql`
query GetResponses($question_code: String!) {
  __typename  
  consumer_questionresponses(where: {question_code: {_eq: $question_code}}) {
      question_code
      question_id
      response_label
      response_value
    }
  }
  `


export default RESPONSES;