import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal'
import { NavDropdown, Form,  FormControl, Button} from 'react-bootstrap';


const validate = values => {
    // custom validation function which returns an object will keys symetrical to values/initialvalues
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    };



const SignupForm = () => {
    // Pass the useFormik() hook initial form values and a submit function that will 
    // be called when the form is submitted

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}
        <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

        
            <label htmlFor="email">Email Address</label>
            <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
            <button type="submit">Submit</button>
           
        </form>

        
    );
};


function SignUpFormButton () {
    const [show, setShow] = useState(false);
    const modalRef = React.createRef();
    return (
        <div>
            <NavDropdown.Item onClick={() => setShow(true)}>Sign Up Form</NavDropdown.Item>
              
    
                <Modal ref={modalRef} show={show} onHide={() => setShow(false)} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Signup Form</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    
  
                    <SignupForm />
  
  
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

export default SignUpFormButton;