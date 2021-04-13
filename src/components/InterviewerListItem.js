import React from "react";

import "components/InterviewerListItem.scss";
const classNames = require("classnames");

export default function InterviewerListItem (props) {
  let interviewersClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interviewersClass} onClick={() => props.setInterviewer(props.name)}>
    <img
      className={interviewersClass}
      src={props.avatar}
      alt="Interviewers name"
    />
    {props.name}
  </li>
  );
}