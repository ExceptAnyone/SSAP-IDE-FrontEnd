import React from "react";
import { Link } from "react-router-dom";

const Name = (props) => {
  const password = props.password;
  const confirmPassword = props.confirmPassword;
  const containnername = props.containnername;
  const MainPage = props.MainPage;
  const handleSubmit = props.handleSubmit;
  const updateContainer = props.updateContainer;
  const handleEditButtonClick = props.handleEditButtonClick;
  const description = props.description;

  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={props.link}>
        <button
          className="edit-btn"
          disabled={
            password !== confirmPassword ||
            (!password && !containnername && !MainPage && !description)
          }
          onClick={
            updateContainer ||
            handleSubmit ||
            handleEditButtonClick ||
            handleEditButtonClick
          }
        >
          {props.name}
        </button>
      </Link>
    </div>
  );
};

export default Name;
