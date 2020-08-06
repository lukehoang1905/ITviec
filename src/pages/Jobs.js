import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../App.css";
import "./Jobs.css";
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

  if (jobList.length === 0) {
    return (
      <div style={{ backgroundColor: "black", height: "100vh" }}>
        <h1>l o a d i n g . . .</h1>
        <img
          src="https://thumbs.gfycat.com/ArcticCharmingHeterodontosaurus-max-1mb.gif"
          alt="loading"
          style={{ height: "50vh" }}
        />
      </div>
    );
  }

  return (
    <div className="all-jobs">
      <Container>
        <Navbar style={{ background: "rgba(42,98,61, 0.85)" }} expand="lg">
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
    </div>
  );
}
