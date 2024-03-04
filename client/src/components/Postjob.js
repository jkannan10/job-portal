import React, { useContext, useState } from "react";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import Navba from "./Navbar";
import axios from "axios";
import myContext from "./ContextProvider";

const PostJobPage = () => {
  /* User id for posted By */
  const { userId } = useContext(myContext);
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    salary: "",
    location: "",
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
    /*Server Side Logic */
    try {
      const id = await axios.post(
        `http://localhost:3001/api/postJob/${userId}`,
        formData
      );
      /* Make a TOAST job posted successfully */
    } catch (err) {
      /* Make a toast unsuccessful to post the job */
      console.log("JK 1503");
    }

    setFormData({
      companyName: "",
      role: "",
      salary: "",
      location: "",
    });
  };

  return (
    <div>
      <Navba />
      <Container style={{ marginTop: "70px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={10}>
            <Form onSubmit={handleSubmit}>
              <Table striped bordered hover>
                <thead>
                  <tr className="text-center">
                    <th>Company Name</th>
                    <th>Role</th>
                    <th>Salary</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter Salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Post Job
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostJobPage;
