import React, { useState } from "react";
import { Form } from "react-formio";
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom'

function CustomForm() {
  const [submission, setSubmission] = useState({});
  const [show, setHide] = useState(false);

  return (
    <div className="App">

      {
        !show ?
          <Form
            form={{
              components: [
                {
                  label: "First Name",
                  validate: { required: true, minLength: 3 },
                  key: "firstName",
                  type: "textfield",
                  input: true
                },
                {
                  type: "textfield",
                  key: "lastName",
                  label: "Last Name",
                  placeholder: "Enter your last name",
                  input: true
                },
                {
                  label: "Pupulate Nast Name",
                  action: "event",
                  showValidations: false,
                  key: "submit1",
                  type: "button",
                  input: true,
                  event: "someEvent"
                },
                {
                  type: "button",
                  label: "Submit",
                  key: "submit",
                  disableOnInvalid: true,
                  input: true
                }
              ]
            }}
            submission={{ data: submission }}
            onSubmit={a => {
              console.log(a);
             // setHide(true)
            }}
            
            onSubmitDone={a => {
              setHide(true)
            }}
            onCustomEvent={customEvent => {
              console.log(customEvent);
              // callnew()
              setSubmission({ ...customEvent.data, lastName: "Laaast Name" });
            }}
          />
          :
          <Route exact path="/" render={() => (window.location = "https://example.com")} />
      }
    </div>
  );
}



export default CustomForm;