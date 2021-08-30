import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = value;

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data && data.error) {
          setValue({ ...value, error: data.error, success: false });
        } else {
          setValue({
            ...value,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("error in signup", err));
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          Your account was created successfully. Please
          <Link to="/signin">Login Here</Link>
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div class="d-grid gap-2">
              <button
                className="btn mt-15 btn-success btn-md borde-radius btn-block"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup page" description="Please sign up here!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
