import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  discription = "Welcome to the Tshirt store!",
  className = "bg-dark text-white p-4",
  children,
  ...props
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 style={{ fontWeight: 200 }}>{title}</h2>
          <h6 style={{ fontWeight: 200 }}>{discription}</h6>
        </div>
        <div className={className} style={props.style}>
          {children}
        </div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <h6>If you got any question feel free to reach out</h6>
          <button className="btn btn-warning btn-sm">Contact us</button>
        </div>
        <div className="container">
          <div className="text-muted">Buy cool trendy tshirts</div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
