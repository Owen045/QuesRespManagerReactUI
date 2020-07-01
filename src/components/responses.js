import React from 'react';
import Button from 'react-bootstrap/Button'
// import responsesModal from './responsesModal.js'
// import { ApolloTableQL } from 'react-tableql'
import { useQuery, useMutation } from '@apollo/react-hooks';
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
// import ADD_RESP from '../mutations/add_response.js';
import DEL_RESP from '../mutations/delResp.js'
//queries
import RESPONSES from '../queries/responses.js'
import AddResp from './addResp.js'




function DelRespButton (props) {
  const label = props.label;
  const val = props.val;
  const question_code = props.question_code;
  const refetch = props.update_resp;

  const [delResp, {data} ] = useMutation(DEL_RESP, {onCompleted: () => {refetch()}});

  // styling

  const butStyle = {margin: 10}

  return (
    <div>
              <form
              onSubmit={e => {
                e.preventDefault();
                delResp({ variables: {question_code: question_code, response_label: label,
                response_value: val }})
              }}>
                
                <Button style={butStyle} type="submit" variant="danger">Delete</Button>

              </form>
            </div>
  )
}

function Responses (props) {
  const loading = props.loading;
  const error = props.error;
  const data = props.data;
  const refetch = props.refetch;
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error... </p>;

    if (data) return data.consumer_questionresponses.map(({ question_code, response_label, response_value }) => (
          
            
      <tr key={response_label}>
        <td>{response_label}</td>
        <td>{response_value}</td>
        <DelRespButton question_code={question_code} label={response_label} val={response_value} update_resp={refetch}/>
      </tr>
     

    )
    
    )

}

function ResponsesTable (props) {
  
  const code = props.question_code;
  const question_type = props.question_type;
  const { loading, error, data, refetch } = useQuery(RESPONSES, {variables: { question_code: code }});
  
  
  if (question_type == 'choice') return (
    <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Response Label</th>
                <th>Response Value</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              <Responses question_code={code} loading={loading} error={error} data={data} refetch={refetch} />
            </tbody>
              
            
             </Table>

            <AddResp qcode={code} refetch={refetch}/>              
  
            

         
        </div>

  ); else if (question_type == 'string') return (
      <div>
          <Alert variant='primary'>
            The question type is 'string' therefore any free text responses are acceptable.
          </Alert>

          <Alert variant='danger'>
            Validation rules management feature still in development!
          </Alert>
      </div>
  ); else if (question_type == 'numeric') return (
    <div>
      <Alert variant='primary'>
        The question type is 'numeric' therefore any numerical integer or floating point number is acceptable.
      </Alert>

      <Alert variant='danger'>
          Validation rules management feature still in development!
      </Alert>
    </div>
  ); else return (
    <div>
    <Alert variant='danger'>
            There is no question type for this question, therefore any response is permitted.
            Please add a question_type to question metadata!
      </Alert>
    </div>
  );
}


export default ResponsesTable;