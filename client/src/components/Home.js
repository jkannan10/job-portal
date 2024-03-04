import React, { useState, useEffect, useContext } from "react";
import { Navbar, Row, Col, Table, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Navba from "../components/Navbar";
import axios from "axios";
import myContext from "./ContextProvider";
function FormExample() {
  const { userId } = useContext(myContext);
  const [jobs, setJobs] = useState([{}]);

  /* Function to handle job apply */
  const handleApply = async (id) => {
    try {
      /* Make a TOAST job applied successfully */
      const response = await axios.post(
        `http://localhost:3001/api/apply/${userId}/${id}`
      );
      console.log(response.data);
    } catch (err) {
      /* Make a TOAST job doesn't applied */
      console.log(err);
    }
  };
  useEffect(() => {
    const sampleJobs = async () => {
      try {
        const allJobs = await axios.get("http://localhost:3001/api/getJobs");
        setJobs(allJobs.data);
      } catch (err) {
        console.log(err);
        console.log("JK 1503");
      }
    };
    sampleJobs();
  }, []);

  return (
    <div>
      <Navba />
      <h1 className="text-center" style={{ marginTop: "50px" }}>
        Find Your New Job Today
      </h1>
      <Navbar
        className="bg-body-tertiary justify-content-center"
        style={{ height: "180px" }}
      >
        <Form className="my-2">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <div className="mb-2 me-md-3" style={{ marginTop: "-100px" }}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Role"
                  aria-label="Role"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="mb-2 me-md-3" style={{ marginTop: "-100px" }}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  className="mr-sm-2"
                />
              </InputGroup>
            </div>
            <div className="mb-2" style={{ marginTop: "-100px" }}>
              <Button type="submit">Search</Button>
            </div>
          </div>
        </Form>
      </Navbar>
      <Container>
        <Row className="justify-content-center" style={{ marginTop: "0px" }}>
          <Col>
            <Form>
              <div className="d-flex justify-content-center">
                {" "}
                {/* Center align the table */}
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>S.No</th>
                      <th>Company Name</th>
                      <th>Role</th>
                      <th>Salary</th>
                      <th>Location</th>
                      <th>Apply for job</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, index) => (
                      <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{job.companyName}</td>
                        <td>{job.role}</td>
                        <td>{job.salary}</td>
                        <td>{job.location}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="primary"
                              onClick={() => handleApply(job._id)}
                            >
                              Apply
                            </Button>
                          </div>
                        </td>
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
}

export default FormExample;
