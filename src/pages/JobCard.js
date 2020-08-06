import React from "react";
import { Row, Col, Badge, Card, Button } from "react-bootstrap";
import "../App.css";
import Moment from "react-moment";

function JobCard({ job, getDetail }) {
  return (
    <Card className="job-content" onClick={() => getDetail(job.id)}>
      <Row>
        <Col>
          <div className="jobcard-logo">
            <img src={job.img} alt="company-logo" />
          </div>
        </Col>
        <Col xs={8}>
          <div className="jobcard-descriptions">
            <h2 className="jobcard-title">{job.title}</h2>
            <div>$ {job.salary}</div>
            <div>
              <ul className="benefit-list">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div>
              {job.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="badge-style">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Col>
        <Col>
          <div className="date-location-box">
            {job.isHotjob ? (
              <Button variant="warning" className="hotjob-label">
                Hot Job
              </Button>
            ) : (
              <div></div>
            )}

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
