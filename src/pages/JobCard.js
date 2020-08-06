import React from "react";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import "../App.css";
import Moment from "react-moment";

function JobCard({ job, getDetail }) {
  return (
    <Card
      className="job-content"
      style={{ background: "rgba(170, 170, 170, 0.85)" }}
      onClick={() => getDetail(job.id)}
    >
      <Row>
        <Col>
          <div className="jobcard-logo">
            <img
              src={job.img}
              alt="company-logo"
              style={{ height: "100px", marginTop: "40px" }}
            />
          </div>
        </Col>
        <Col xs={8} style={{ border: "3px solid rgba(180, 180, 180, 0.4)" }}>
          <div className="jobcard-descriptions">
            <h2
              className="jobcard-title"
              style={{ textDecoration: "underline" }}
            >
              {job.title}
            </h2>
            <h4 style={{ color: "yellow" }}>$ {job.salary}</h4>
            <div>
              <ul className="benefit-list">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>
                    <h4>{benefit}</h4>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {job.tags.map((tag, index) => (
                <Badge key={index} variant="dark" className="badge-style">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Col>
        <Col>
          <div className="date-location-box">
            {job.isHotjob ? (
              <Button variant="danger" className="hotjob-label">
                Hot Job
              </Button>
            ) : (
              <div></div>
            )}
            <br></br>
            <br></br>
            <div className="jobcard-location">
              <div>{job.city}</div>
              <div>District {job.district}</div>
            </div>
            <div className="job-time">
              <Moment fromNow>{job.time}</Moment>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default JobCard;
