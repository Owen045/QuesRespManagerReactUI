import { gql } from "apollo-boost";

const DELALLRESPS = gql`
    mutation DelResponses($question_code: String!) {
        __typename
        delete_consumer_questionresponses(where: {question_code: {_eq: $question_code}}) {
        affected_rows
        }
    }
    
`


export default DELALLRESPS;