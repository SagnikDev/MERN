import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getaCategory,
} from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (event) => {
    setName(event.target.value);
    setError("");
  };
  const { user, token } = isAuthenticated();
  const preLoad = (categoryId) => {
    getaCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setName(data.name);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preLoad(match.params.categoryId);
  },[]);
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    updateCategory(match.params.categoryId,user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setName("");
          setSuccess(true);
        }
      })
      .catch(console.log("Error in Adding Categories"));
  };
  const successMessage = () => {
    return (
      success && <h4 className="text-success">Category Updated Successfully</h4>
    );
  };
  const warningMessage = () => {
    return error && <h4 className="text-danger">Failed to Update category</h4>;
  };
  const performRedirect = () => {
    return (
      success && (
          <Redirect to="/admin/categories"/>
      )
    );
  };
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-small btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };
  const myCategoyForm = () => {
    return (
      <form>
        <div className="form-group">
          <h1 className="lead">Enter a Category:</h1>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Example Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Update Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Update Category Here"
      description="Update Tshirts"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()} {warningMessage()} {myCategoyForm()} {goBack()} {performRedirect()}
        </div>
      </div>
      {name}
    </Base>
  );
};

export default UpdateCategory;
