import React, { useState } from "react";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import Navbar from "./Navbar";
import backgroundImage from "../assets/blue.jpg";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "user", // Default to regular user
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can perform form submission logic, such as sending the data to a server
    try {
      const response = await axios.post(
        "http://localhost:3001/api/signup",
        formData
      );
      /* Make a TOAST SIGN UP SUCCESSFUL */
      /* Direct to LOGIN page */
    } catch (err) {
      /* Make a TOAST Mail Id already exists */
      console.log("JK 1503");
    }
    // console.log(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      userType: "user",
    });
  };

  return (
    <div
      className="login-page"
      style={{
        background: `linear-gradient(to bottom, rgb(173,216,230), rgb(173,216,230)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card
              className="shadow blur-card"
              style={{
                borderRadius: "15px",
                width: "450px",
                marginLeft: "70px",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center mb-4">Signup</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicUsername" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicUserType" className="mb-3">
                    <div className="d-flex justify-content-around">
                      <Form.Check
                        id="user"
                        type="radio"
                        label="User"
                        name="userType"
                        value="user"
                        checked={formData.userType === "user"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        id="admin"
                        type="radio"
                        label="Admin"
                        name="userType"
                        value="admin"
                        checked={formData.userType === "admin"}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                  <div className="d-grid mt-4">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Signup
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
