import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = (props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link
          className="btn btn-sm btn-danger text-white mb-3"
          to="/admin/dashboard"
        >
          Go back
        </Link>
      </div>
    );
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("on c create");
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((res) => {
      if (res && res.error) {
        setError(true);
      } else {
        setError("");
        setName("");
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h6 className="text-success">Category added successfull!</h6>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h6 className="text-danger">Failed to create category!</h6>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <div className="lead">Enter the category</div>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button className="btn btn-outline-warning" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create product categoty"
      description="Add categories for your Tshirts"
      className="container p-4"
      style={{ background: "#eba83a" }}
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
