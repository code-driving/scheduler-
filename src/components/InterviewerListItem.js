import React from "react";

import "components/InterviewerListItem.scss";
const classNames = require("classnames");

export default function InterviewerListItem (props) {
  let interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  let imageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  })
  return (
    <li className={interviewersClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={imageClass}
      src={props.avatar}
      alt="Interviewers name"
    />
    {props.name}
  </li>
  );
}