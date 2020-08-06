import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../App.css";
import JobCard from "./JobCard";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const apiAddress = process.env.REACT_APP_SEVER_URL;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
  let query = useQuery();
  const [jobList, setJobList] = useState([]);
  const [keyword, setKeyword] = useState(query.get("q"));
  const [originalList, setOriginalList] = useState([]);

  let history = useHistory();

  const getData = async () => {
    try {
      let url = `${apiAddress}/jobs`;
      let response = await fetch(url);
      let data = await response.json();
      setJobList(data);
      setOriginalList(data);
    } catch (err) {
      console.log("err", err.message);
    }
  };
  const getDetail = (id) => {
    history.push(`/jobs/${id}`);
  };
  useEffect(() => {
    getData();
  }, []);

  const searchByKey = (e) => {
    let filteredList = originalList;
    if (e) {
      e.preventDefault();
      history.push(`/jobs?q=${keyword}`);
    }
    if (keyword) {
      filteredList = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setJobList(filteredList);
  };
  useEffect(() => {
    searchByKey();
  }, [originalList]);
  if (jobList.length === 0) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">NhieuViec</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            <Form onSubmit={(e) => searchByKey(e)} inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container>
        {jobList &&
          jobList.map((job) => (
            <JobCard job={job} key={job.id} getDetail={getDetail} />
          ))}
      </Container>
    </>
  );
}
