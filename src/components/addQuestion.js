import React, { useState } from 'react';
// import responsesModal from './responsesModal.js'
import Modal from 'react-bootstrap/Modal'
import { NavDropdown, Form,  FormControl, Button, Col} from 'react-bootstrap';
import ADD_QUES from '../mutations/add_question.js'
import { useMutation } from '@apollo/react-hooks';
import { useFormik, Formik } from 'formik';
import Alert from 'react-bootstrap/Alert'
import * as yup from 'yup';


function AddQuesForm () {
    
    const [complete, setComplete] = useState(false)

    const [addQues, { loading, data, error: MutationError }] = useMutation(ADD_QUES, {onCompleted: () => {console.log('mutation done');
                                                                                    setComplete(true)},
                                                                                onError: (MutationError) => {console.log(MutationError);
                                                                                    
                                                                                    setComplete("error")}});

    const schema = yup.object().shape({
        formBasicCode: yup.string().required(),
        formBasicLabel: yup.string().required(),
        formBasicStatus: yup.string(),
        formBasicText: yup.string().required(),
        formBasicType: yup.string(),
        formBasicSurveyType: yup.string(),
        formBasicStandard: yup.boolean(),
    })

    if (complete === false) return (
    <div>
    <Formik
    initialValues={{
        formBasicCode: '',
        formBasicLabel: '',
        formBasicStatus: 'active',
        formBasicText: '',
        formBasicType: 'string',
        formBasicSurveyType: 'screener',
        formBasicStandard: false,
    }}
    validationSchema={schema}
    onSubmit={(values, actions) => {
        console.log('submitted')
        //alert(JSON.stringify(values)
        addQues({variables: {question_code: values.formBasicCode, question_label: values.formBasicLabel, 
                            question_status: values.formBasicStatus, question_text: values.formBasicText,
                            question_type: values.formBasicType, survey_type: values.formBasicSurveyType,
                            standard: values.formBasicStandard 
        }}
        );
    }}>
        {formik => (

            <Form noValidate onSubmit={formik.handleSubmit}>

            <Form.Row>
            <Form.Group as={Col} md="6" controlId="formBasicCode">
                <Form.Label>Question Code</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Question Code" 
                value={formik.values.formBasicCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.touched.formBasicCode && !formik.errors.formBasicCode}
                isInvalid={!!formik.errors.formBasicCode}/>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.formBasicCode}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6"  controlId="formBasicLabel">
                <Form.Label>Question Label</Form.Label>
                <Form.Control
                as="textarea"  
                type="text" 
                placeholder="Question Label"    
                value={formik.values.formBasicLabel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                isValid={formik.touched.formBasicLabel && !formik.errors.formBasicLabel}
                isInvalid={!!formik.errors.formBasicLabel}/>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.formBasicLabel}
                </Form.Control.Feedback>
            </Form.Group>

            </Form.Row>

            <Form.Row>

            <Form.Group as={Col} md="6"  controlId="formBasicStatus">
                <Form.Label>Question Status</Form.Label>
                <Form.Control 
                as="select"
                value={formik.values.formBasicStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                  {formik.errors.formBasicStatus}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6"  controlId="formBasicText">
                <Form.Label>Question Text</Form.Label>
                <Form.Control
                as="textarea"  
                type="string" 
                placeholder="Question Text"
                value={formik.values.formBasicText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                isValid={formik.touched.formBasicText && !formik.errors.formBasicText}
                isInvalid={!!formik.errors.formBasicText}/>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.formBasicText}
                </Form.Control.Feedback>
            </Form.Group>

            </Form.Row>

            <Form.Row>

            <Form.Group as={Col} md="6"  controlId="formBasicType">
                <Form.Label>Question Type</Form.Label>
                <Form.Control 
                as="select"
                value={formik.values.formBasicType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                
                    <option value="string">string</option>
                    <option value="numeric">numeric</option>
                    <option value="choice">choice</option>
                    </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formBasicSurveyType">
                <Form.Label>Survey Type</Form.Label>
                <Form.Control 
                as="select"
                value={formik.values.formBasicSurveyType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                >
                    <option value="screener">screener</option>
                    <option value="questionnaire">questionnaire</option>
                    <option value="diary">diary</option>
                    </Form.Control>
            </Form.Group>

            </Form.Row>

            <Form.Row>

            <Form.Group as={Col} md="6" controlId="formBasicStandard">
                <Form.Check 
                type="checkbox" 
                label="Tick if in Standard" 
                value={formik.values.formBasicStandard}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}></Form.Check>
                
            </Form.Group>

            </Form.Row>


            <Button variant="success" type="submit">
                Submit
            </Button>
            </Form>


        )}

    </Formik>
    </div>
    ); else if (complete === true) return (
        <div>
            <Alert variant="success">
                New Question succesfully added!
            </Alert>

        </div>
    ); else if (complete === "error") return (
        <div>
            <Alert variant="danger">
                Error uploading new question!
                {MutationError.message}
                
                Please try again
            </Alert>
        </div>
    )
}



function AddQuestionButton ({refetch}) {
    const [show, setShow] = useState(false);
    


    return (
      <div>
          <Button variant="outline-success" onClick={() => setShow(true)}>Add Question</Button>
            
  
              <Modal show={show} onHide={() => setShow(false)} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Add a New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  

                  <AddQuesForm />


                </Modal.Body>
        
        
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => {setShow(false); refetch()}}>
                    Close
                  </Button>
          
                </Modal.Footer>
              </Modal>
          </div>
    )
  }

export default AddQuestionButton;