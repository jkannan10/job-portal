import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Navbar.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Sidebar() {
  const location = useLocation();

  return (
    <>
      <Navbar className="lightblue-navbar" variant="light" expand="md" fixed="top">
        <Container>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faBriefcase} className="me-2" style={{ color: 'rgb(94, 212, 241)' }} />
            <h2 style={{ color:'black', margin: 0 }}>JobPortal</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/home" style={{ color: location.pathname === '/home' ? 'blue' : 'inherit' }}><h4>Search Job</h4></Nav.Link>
              <Nav.Link as={NavLink} to='/postjob' style={{ color: location.pathname === '/postjob' ? 'blue' : 'inherit' }}><h4>Post a Job</h4></Nav.Link>
              <Nav.Link as={NavLink} to='/joblist' style={{ color: location.pathname === '/joblist' ? 'blue' : 'inherit' }}><h4>Job List</h4></Nav.Link>
              <Nav.Link as={NavLink} to='/help' style={{ color: location.pathname === '/help' ? 'blue' : 'inherit' }}><h4>Help</h4></Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-primary" as={NavLink} to="/login" className='me-3'>Login</Button>
              <Button variant="primary" as={NavLink} to="/signup">Signup</Button> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
export default Sidebar;
