import React from 'react';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faChevronLeft, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddQuestionButton from './addQuestion.js'


library.add(fab, faCheckSquare, faCoffee, faChevronLeft, faChevronCircleLeft)



function CustomNavbar ({refetch}) {
    return (
        <div className="Navbar">
                <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
                    <Navbar.Brand>Q&A Manager</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="#home"></Nav.Link>
                            <Nav.Link href={process.env.REACT_APP_HOMEPAGE} ><FontAwesomeIcon icon="chevron-circle-left" /> Return to Homepage</Nav.Link>
                                          
                        </Nav>
                        
                         <AddQuestionButton refetch={refetch}/>
                        
                    </Navbar.Collapse>
                    </Navbar>
            </div>
    )
}



export default CustomNavbar;