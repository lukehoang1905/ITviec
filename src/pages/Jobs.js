import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../App.css";
import JobCard from "./JobCard";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const apiAddress = process.env.REACT_APP_SEVER_URL;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
  let query = useQuery();
  const [jobList, setJobList] = useState([]);
  const [keyword, setKeyword] = useState(query.get("q"));
  const [originalList, setOriginalList] = useState([]);
  const dispatch = useDispatch();
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
  const email = useSelector((state) => state.user.email);

  const signOut = () => {
    alert("sign-out");
  };

  if (jobList.length === 0) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">NhieuViec</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {email ? (
                <Nav.Link onClick={() => dispatch({ type: "LOGOUT" })}>
                  Sign-out
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => history.push("/login")}>
                  Login
                </Nav.Link>

                // <Nav.Link href="/login">Login</Nav.Link> REFRESH PAGE REFRESH STATE
              )}
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
