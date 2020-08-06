import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "./Detail.css";
import Moment from "react-moment";
const apiAddress = process.env.REACT_APP_SEVER_URL;

export default function Detail({ props }) {
  //param is a mandatory value
  let { id } = useParams();
  const [job, setJob] = useState(null);

  let getDetailData = async () => {
    let url = `${apiAddress}/jobs/${id}`; //alerat
    let response = await fetch(url);
    let data = await response.json();
    setJob(data);
    console.log(data);
  };

  useEffect(() => {
    getDetailData();
  }, []);
  const now = Date.now();
  if (job == null) {
    return (
      <div className="des">
        <h1>"L o a d i n g . . ."</h1>
        <img
          src="https://em.wattpad.com/78c42e0846efd587d3215cc03e6d010a9d76b845/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f77744e306c7a6a50726b503171673d3d2d3539303435373531302e313533386566393133313533633939323733353738363335383134342e676966"
          alt="loading"
          style={{ width: "50vw" }}
        />
      </div>
    );
  }

  return (
    <div className="des">
      <Container>
        <Card style={{ background: "rgba(255, 255, 255, 0.5)" }}>
          <Card.Header as="h1">{job.title}</Card.Header>
          <Card.Body>
            <Badge variant="info">Up to ${job.salary}</Badge>
            <Row>
              <Col>
                <div className="jobcard-logo">
                  <img
                    src={job.img}
                    alt="company-logo"
                    style={{ width: `100px` }}
                  />
                  <p>Location : {job.city}</p>
                </div>
              </Col>
              <Col xs={8}>
                <h4 style={{ textAlign: "left" }}>{job.description}</h4>
              </Col>
            </Row>
            <Card.Text>
              Updated <Moment fromNow>{job.time}</Moment>
            </Card.Text>
            <Button variant="success">Apply Now!</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
