import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //Calling Helper funtion
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("")
      }
    });
  };
  const successMessage=()=>{
    if(success){
        return(
           <h4 className="text-success">Category Created Successfully</h4> 
        )
    }
  }
  const warningMessage=()=>{
      if(error){
          return(
              <h4 className="text-danger">Failed to create Category</h4>
          )
      }
  }
  const myCategoyForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter a Category:</p>
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
            Create Category
          </button>
        </div>
      </form>
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
  return (
    <Base
      title="Create a Category Here"
      description="Add a new category for new Tshirts"
      className="container bg-success p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
        {successMessage()}
        {warningMessage()}
          {myCategoyForm()}
          {goBack()}
        </div>
      </div>
      {JSON.stringify(name)}
      {JSON.stringify(error)}
      {JSON.stringify(success)}
    </Base>
  );
};

export default AddCategory;
