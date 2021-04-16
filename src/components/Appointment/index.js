import React, { Fragment } from "react";

import "components/Appointment/styles.scss";
// const classNames = require('classnames');
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
            name={props.name}
            value={props.value}
            interviewers={[]}
            onCancel={back}
          />
        )}
      </article>
    </Fragment>
  );
}
