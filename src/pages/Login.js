import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import loginMiddleware from "../store/action/authAction";

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
    <>
      <h1>Login</h1>
      <Form onSubmit={(e) => login(e)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onSubmit={(e) => login(e)}>
          submit
        </Button>
      </Form>
    </>
  );
}
