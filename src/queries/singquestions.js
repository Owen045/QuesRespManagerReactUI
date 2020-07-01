import { gql } from "apollo-boost";

const GetQuestion = gql`query GetQuestion($question_code: String!) {
  __typename    
  consumer_questioninfo(where: {question_code: {_eq: $question_code}}) {
        question_code
        question_label
        question_status
        question_text
        question_type
        survey_type
        standard
        question_code
      }
    }`

  
export default GetQuestion;