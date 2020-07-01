import { gql } from "apollo-boost";


const DEL_QUES = gql`
mutation DelQues($question_code: String!) {
  __typename
    delete_consumer_questioninfo(where: {question_code: {_eq: $question_code}}) {
      affected_rows
    }
  }
`


export default DEL_QUES;