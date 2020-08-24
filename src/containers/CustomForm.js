import React, {Component} from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import { selectRoot } from "react-formio";
import { FormBuilder } from 'react-formio';
import { Form as FormIO } from 'react-formio';
import { Route } from 'react-router-dom'


class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  
  sendDeviceInfo = (event) => {
    // Simple POST request with a JSON body using fetch
    console.log("Success")
    this.setState({ show: true })

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic hQCOKs75uoYxakySqIA7qrjzdj2Z9PYn'
      },
      body: JSON.stringify({
        deviceId: '5b4588ba164e12f6345',
        deviceName: 'Samsung Galaxy J7',
        os: 'Android',
        osVersion: '10.14.6',
        appVersion: '1.0.0',
        firebaseToken: 'ej59N6AC8xA:APA91bGuLKLQg-9q8jsBOUra0MIkmz4agl2IgtRfnyAARtv0Ws0oAVI7YMtYBJkQKqoIxTrTyHRdLXpmyf1YidAPzkZxuAbcHls9pVnbTQHIl_znXnCL1Cfw2-2PN1sI1hPFBCLncr0b', // required: true
        lat: '20.560796',
        long: '106.076115'
      })
    };
    fetch('https://dev10api.ayainnovation.com/api/user/sendDeviceInfo', requestOptions)
      .then(response => response.json())
      .then(data => console.log("Response", data));
  }

  render() {
    return (
      <div>
        <div className="container" id="main">
          {
            !this.state.show ?
              <FormIO src="https://xojgwtxalpylmpd.form.io/registration" onSubmit={(submission) => this.sendDeviceInfo(submission)} />
              :
              <Route exact path="/" render={() => (window.location = "https://example.com")} />
          }
        </div>
      </div>
    )
  }
}

export default CustomForm
