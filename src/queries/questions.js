import { gql } from "apollo-boost";

const AllQuestions = gql`query AllQuestions{
  __typename  
  consumer_questioninfo {
        question_code
        question_label
        question_status
        question_text
        question_type
        survey_type
        standard
      }
            }`


export default AllQuestions;