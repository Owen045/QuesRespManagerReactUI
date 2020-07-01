import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
// import responsesModal from './responsesModal.js'
import Modal from 'react-bootstrap/Modal'


import ResponsesTable from './responses.js'


function ResponseButton (props) {
  const question_code = props.question_code;
  const question_type = props.question_type;
  const [show, setShow] = useState(false);

  return (
    <div>
          <Button variant="success"
            onClick={() => setShow(true)} >View</Button>
        

            <Modal show={show} onHide={() => setShow(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Responses for: {question_code}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ResponsesTable question_code={question_code} question_type={question_type}/>
              </Modal.Body>
      
              
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
        
              </Modal.Footer>
            </Modal>
        </div>
  )
}


  export default ResponseButton;