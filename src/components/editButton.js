import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { NavDropdown, Form,  FormControl, Button, Col} from 'react-bootstrap';
// mutations
import DEL_QUES from '../mutations/del_question.js'
import EDIT_QUES from '../mutations/edit_question.js'
import DELALLRESPS from '../mutations/delAlllResps.js'

 
function EditForm (props) {

  const butStyle = {margin: 15}

  const [delWarn, setdelWarn] = useState('none');
  const [isDel, setisDel] = useState(false)

  const refetch = props.refetch;
  const updateQuery = props.updateQuery;
  const question_code = props.question.question_code;
  const question_label = props.question.question_label;
  const question_status = props.question.question_status;
  const question_text = props.question.question_text;
  const question_type = props.question.question_type;
  const survey_type = props.question.survey_type;
  const standard = props.question.standard;

  const [delQues, { loading, data, error }] = useMutation(DEL_QUES, {onCompleted: () => {setisDel(true)}})

  const [delResps, {loadingr, datar, errorr}] = useMutation(DELALLRESPS, {onCompleted: () => {delQues({variables: {question_code: question_code}})}})

  const [editQues, {loading: editLoading, data: editData, error: editError}] = useMutation(EDIT_QUES, {onCompleted: () => {setisDel('edited');}})

  const schema = yup.object().shape({
    formBasicCode: yup.string().required(),
    formBasicLabel: yup.string().required(),
    formBasicStatus: yup.string(),
    formBasicText: yup.string().required(),
    formBasicType: yup.string(),
    formBasicSurveyType: yup.string(),
    formBasicStandard: yup.boolean(),
})

  if (isDel === false) return (
      <div>
        <Formik
        initialValues={{
          formBasicCode: question_code,
          formBasicLabel: question_label,
          formBasicStatus: question_status,
          formBasicText: question_text,
          formBasicType: question_type,
          formBasicSurveyType: survey_type,
          formBasicStandard: standard,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          console.log('submitted');
          editQues({variables: {question_code: values.formBasicCode, question_label: values.formBasicLabel, 
            question_status: values.formBasicStatus, question_text: values.formBasicText,
            question_type: values.formBasicType, survey_type: values.formBasicSurveyType,
            standard: values.formBasicStandard}})
        }}
        >
          {formik => (

                <Form noValidate onSubmit={formik.handleSubmit}>

                <Form.Row>
                <Form.Group as={Col} md="6" controlId="formBasicCode">
                    <Form.Label>Question Code</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder={question_code}
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
                    onBlur={formik.handleBlur}
                    checked={eval(formik.values.formBasicStandard)}
                    ></Form.Check>
                    
                </Form.Group>

                </Form.Row>


                <Button style={butStyle} variant="success" type="submit">
                    Submit
                </Button>

                <Button className="float-right" style={butStyle} variant="danger" onClick={() => setdelWarn('block')}>
                    Delete
                  </Button>
                </Form>

          )          
          }


        </Formik>


      
        <Alert variant="danger" style={{display: delWarn}}>
          Are you sure you want to delete question: {question_code}? Click 
          <Alert.Link onClick={() => {console.log('clickedy');
                                      delResps({variables: {question_code: question_code}})}}> here</Alert.Link> to delete or 
          <Alert.Link onClick={() => {setdelWarn('none')}}> cancel</Alert.Link>
          
        </Alert>
      </div>

   ); else if (isDel === true) return (
     <div>
        <Alert variant="success">
                Question: {question_code} succesfully deleted!
          </Alert>

     </div>
   ); else if (isDel === "edited") return (
     <div>
       <Alert variant="success">
                Question: {question_code} succesfully edited!
          </Alert>
       </div>
   )
}



// need to configure a form with default values and fields to change/edit values


function EditButton (props) {
  const question_code = props.question_code;
  const refetch = props.refetch;
  const updateQuery = props.updateQuery;
  const gotoPage = props.gotoPage;
  const pageIndex = props.pageIndex;
  // console.log('paaage')
  // console.log(pageIndex);
  const [show, setShow] = useState(false);
  
  // promise and async function set up for onClick event to return user to page which they were previously on
  function getRefetch() {
    
    return new Promise((resolve, reject) => {
      refetch();
      resolve(refetch());
      
    })
  }


   async function click() {
     try {
    let something = await getRefetch();
    gotoPage(pageIndex);
   }
    catch(error) {
      console.log('error: ' + error)
    }
  }
  
  

  
  
   
  return (
    <div>
          <Button variant="primary" parm="you see dis"
            onClick={() => setShow(true)} >Edit</Button>
        

            <Modal show={show} onHide={() => setShow(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Edit info for: {question_code}</Modal.Title>
                
              </Modal.Header>
              <Modal.Body>
                <EditForm question={props} refetch={refetch} updateQuery={updateQuery}/>

                
              </Modal.Body>
      
      
              <Modal.Footer>
               
              
                  <Button variant="secondary" onClick={() => {setShow(false); click()}}>
                    Close
                  </Button>
        
              </Modal.Footer>
            </Modal>
      </div>
   )
  
  
}


  export default EditButton;