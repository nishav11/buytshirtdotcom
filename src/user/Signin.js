import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
    });
    signin({ email, password })
      .then((response) => {
        if (response && response.error) {
          setValues({
            ...values,
            error: response.error,
            loading: false,
          });
        } else {
          authenticate(response, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log("error occured in signin", err));
  };

  const redirectUser = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () =>
    loading && (
      <div className="alert alert-info">
        <h4>Loading...</h4>
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                type="text"
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
                className="btn mt-15 btn-success btn-lg btn-block"
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
    <Base title="Signin page" description="Please sign in here!">
      {loadingMessage()}
      {errorMessage()}
      {!user ? signInForm() : null}
      {redirectUser()}
    </Base>
  );
};

export default Signin;
