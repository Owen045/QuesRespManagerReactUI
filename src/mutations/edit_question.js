import { gql } from "apollo-boost";


const EDIT_QUES = gql`
mutation EditQues ($question_code: String!, $question_label: String!, $question_status: String!, $question_text: String!, $question_type: String!, $standard: Boolean!, $survey_type: String!) {
  __typename  
    update_consumer_questioninfo(_set: {question_code: $question_code, question_label: $question_label, question_status: $question_status, question_text: $question_text, question_type: $question_type, standard: $standard, survey_type: $survey_type}, where: {question_code: {_eq: $question_code}}) {
      affected_rows
    }
  }
`


export default EDIT_QUES;