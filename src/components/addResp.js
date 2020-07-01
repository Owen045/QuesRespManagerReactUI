import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from 'react-bootstrap/Button'
import ADD_RESP from '../mutations/add_response.js'
import Table from 'react-bootstrap/Table'


  // function AddResp

  function AddResp(props) {
    let input_lab;
    let input_val;
    const refetch = props.refetch;
    const [addResponse, { loading, data }] = useMutation(ADD_RESP, {onCompleted: () => {refetch()}});
    const qcode = props.qcode;
    

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addResponse({ variables: { question_code: qcode, response_label: input_lab.value, response_value: input_val.value } });
            input_lab.value = '';
            input_val.value = '';

            
          }}
        >
          <Table responsive>
          
          <tfoot>
              <tr>
                <td>
                  <input name="label" ref={node => {
                    input_lab = node;
                   }} />
                </td>
                <td>
                  <input name="val" ref={node => {
                      input_val = node;
                      console.log(node)
                      }} />
                </td>
                <td>
                  <Button variant="success" type="submit">Add</Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </form>
      </div>
    );
  }


export default AddResp;