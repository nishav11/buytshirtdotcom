import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";

const Home = (props) => {
  console.log("APIS are", API);

  return (
    <Base>
      <div className="row">
        <div className="col-4">
          <Card />
        </div>

        <div className="col-4"></div>
        <div className="col-4"></div>
      </div>
    </Base>
  );
};

export default Home;
