import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import loginMiddleware from "../store/action/authAction";
import "./Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    let user = { email: email, password: password };
    dispatch(loginMiddleware(user));
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated === true) {
    console.log("trasdaf", isAuthenticated);
    alert("success");
    return <Redirect to="/jobs" />;
  }

  return (
    <div className="all-login">
      <div id="top" className="container d-flex">
        <div className="col-8"></div>
        <Form onSubmit={(e) => login(e)} className="col-4">
          <h1>Login</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <div className="empty"></div>
          <Form.Group controlId="formBasicPassword" id="bot">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" onSubmit={(e) => login(e)}>
            Submit
          </Button>
        </Form>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
