import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
// const classNames = require('classnames');
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        ) : (
          <Empty />
        )}
      </article>
    </Fragment>
  );
}
