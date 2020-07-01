// import gql from 'graphql-tag';
import { gql } from "apollo-boost";


const ADD_QUES = gql`mutation AddQuestion ($question_code: String!, $question_label: String!, $question_status: String!, $question_text: String!, $question_type: String!, $standard: Boolean!, $survey_type: String!) {
    __typename
    insert_consumer_questioninfo(objects: {question_code: $question_code, question_label: $question_label, question_status: $question_status, question_text: $question_text, question_type: $question_type, standard: $standard, survey_type: $survey_type}) {
      affected_rows
    }
  }`


export default ADD_QUES;