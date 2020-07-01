// import gql from 'graphql-tag';
import { gql } from "apollo-boost";


const ADD_RESP = gql`
mutation AddResponse($question_code: String!, $response_label: String!, $response_value: String!) {
    __typename
    insert_consumer_questionresponses(objects: {question_code: $question_code, response_label: $response_label, response_value: $response_value}) {
      affected_rows
    }
  }
  
`;


export default ADD_RESP;

