import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

import "components/Appointment/styles.scss";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  // const validate = () => {
  //   if (name === "") {
  //     setError("Please type in your name");
  //     return;
  //   }
  //   setError("");
  //   props.onSave(name, interviewer);
  // };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* <form autoComplete="off" onSubmit={(event) => event.preventDefault()}> */}
        <form autoComplete="off" onSubmit={((event) => event.preventDefault())}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onSubmit={(event) => event.preventDefault()}
            onClick={validate}
          >
            Save
          </Button> */}
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button 
          onClick={() => props.onSave(name, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
