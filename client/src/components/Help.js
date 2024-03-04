import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navba from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './HelpPage.css'; // Import custom CSS for additional styling

function HelpPage() {
  return (
    <div className="help-page">
      <Navba />
      <Container className="mt-5">
        <h1 className="text-center mb-4">Need Help?</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            <p className="lead text-center">
              Welcome to our help center. If you have any questions or need assistance, our team is here to help you.
            </p>
            <Row className="mb-4">
              <Col md={6} className="text-center">
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} size="3x" />
                </div>
                <h4>Email Support</h4>
                <p>Contact us via email at <a href="thiruselvan0319@gmail.com">thiruselvan0319@gmail.com</a>.</p>
              </Col>
              <Col md={6} className="text-center">
                <div className="icon">
                  <FontAwesomeIcon icon={faPhone} size="3x" />
                </div>
                <h4>Phone Support</h4>
                <p>Call us at <a href="8838974963">8838974963</a>.</p>
              </Col>
            </Row>
            <p className="text-center">
              Our support team is available Monday through Friday from 9am to 5pm.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HelpPage;
