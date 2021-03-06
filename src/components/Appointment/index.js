import React, { Fragment, useEffect } from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    if (name && interviewer) {
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    } else {
      transition(ERROR_SAVE, true);
    }
  }

  // function destroy(event) {
  //   transition(DELETING, true);
  //   props
  //     .cancelInterview(props.id)
  //     .then(() => transition(EMPTY))
  //     .catch((error) => transition(ERROR_DELETE, true));
  // }
  function destroy() {
    if (mode === CONFIRM) {
      transition(DELETING, true);

      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch((error) => transition(ERROR_DELETE, true));
    } else {
      transition(CONFIRM);
    }
  }

  return (
    <Fragment>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            cancelInterview={props.cancelInterview}
            id={props.id}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            onCancel={back}
            onConfirm={destroy}
            message="Are you sure you would like to delete?"
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.name ? props.name : props.interview.student}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
            value={props.value}
            interviewer={props.interview.interviewer.id}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="Sorry, could not save appointment. Please enter name and choose interviewer"
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not cancel appointment" onClose={back} />
        )}
      </article>
    </Fragment>
  );
}
