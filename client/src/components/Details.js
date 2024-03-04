import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Table, Container } from "react-bootstrap";
import Navba from "./Navbar";
import axios from "axios";
import myContext from "./ContextProvider";
const Details = () => {
  const [applicants, setApplicants] = useState([]);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const { jobIdApp } = useContext(myContext);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/applicantsJob/${jobIdApp}`
        );
        const job = await axios.get(
          `http://localhost:3001/api/getJob/${jobIdApp}`
        );
        setRole(job.data.role);
        setLocation(job.data.location);
        setApplicants([...response.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplicants();
  }, [jobIdApp]);
  return (
    <div>
      <Navba />
      <Container>
        <Row className="justify-content-center" style={{ marginTop: "100px" }}>
          <Col>
            <Form>
              <div className="d-flex justify-content-center">
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>S.No</th>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((applicant, index) => (
                      <tr className="text-center">
                        <th>{index + 1}</th>
                        <th>{applicant.name}</th>
                        <th>{applicant.email}</th>
                        <th>{role}</th>
                        <th>{location}</th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Details;
