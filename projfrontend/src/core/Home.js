//Index Page
import React from "react";
//Importing CSS file
import "../styles.css";
import { API } from "../backend";
// Importing Base format
import Base from "./Base.js";
//Making Home Page
export default function Home() {
  // console.log("API IS ", API);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
}
