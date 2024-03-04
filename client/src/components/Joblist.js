import React, { useContext, useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Navba from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import myContext from "./ContextProvider";
import axios from "axios";

function JobListPage() {
  const { userId, admin } = useContext(myContext);
  const [jobs, setJobs] = useState([{}]);
  const { jobIdApp, setJobIdApp } = useContext(myContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAdminJobs = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/postedJobs/${userId}`
      );
      setJobs(response.data);
    };
    const fetchUserJobs = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/appliedJobs/${userId}`
      );
      setJobs(response.data);
    };
    if (admin) {
      console.log(admin);
      fetchAdminJobs();
    } else {
      fetchUserJobs();
    }
  }, []);
  /*Handle Details */
  const handleDetails = (id) => {
    /*navigate to details*/
    setJobIdApp(id);
    navigate("/details");
  };
  /* handle Delete */
  const handleDelete = async (id) => {
    try {
      const job = await axios.delete(
        `http://localhost:3001/api/deletejob/${id}`
      );
      console.log(job.data);
      setJobs(jobs.filter((job) => job._id !== id));
      /* Make a TOAST Job deleted Sucessfully */
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navba />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Job List</h1>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>S.No</th>
                <th>Company Name</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Location</th>
                {admin && <th>Action</th>}
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
                  {admin && (
                    <td>
                      <div className="d-flex justify-content-center">
                        <Link to="/details">
                          <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => {
                              handleDetails(job._id);
                            }}
                          >
                            Details
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => {
                            handleDelete(job._id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default JobListPage;
