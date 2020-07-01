// import gql from 'graphql-tag';
import { gql } from "apollo-boost";

const DEL_RESP = gql`
mutation MyMutatio($question_code: String!, $response_label: String!, $response_value: String!) {
  __typename
  delete_consumer_questionresponses(where: {question_code: {_eq: $question_code}, response_label: {_eq: $response_label}, response_value: {_eq: $response_value}}) {
    affected_rows
  }
}`;

export default DEL_RESP;