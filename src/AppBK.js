import React, { useState } from "react";
import { Route } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
import { AppConfig } from './config';
import { Form as FormIO } from 'react-formio';
import { FormBuilder } from 'react-formio';
import { Alert } from 'react-alert'
import { ExternalLink } from 'react-external-link';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  sendDeviceInfo = (event) => {
    // Simple POST request with a JSON body using fetch
    console.log("Submittion Data", event.data)
    // this.setState({ show: true })
    //window.location.href = "https://example.com?message=success";

    //window.ReactNativeWebView.postMessage(event.data.fullName)//=react-native-webview
    // window.postMessage(event.data);
    window.postMessage({ formData: event.data }, "Success");

    // This one won't work.
    // window.ReactNativeWebView.postMessage(JSON.stringify(data), "*");

    // This will work.
    window.postMessage(JSON.stringify(event.data));

    window.addEventListener("message", message => {
      console.log("Message", message.data) // Wayne is coming!!!
      window.postMessage('Client received data')
    });

    let body = {
      data: event.data
    }

    console.log("Mobile Data", JSON.stringify(body))

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic hQCOKs75uoYxakySqIA7qrjzdj2Z9PYn'
    //   },
    //   body: JSON.stringify({
    //     deviceId: '5b4588ba164e12f6345',
    //     deviceName: 'Samsung Galaxy J7',
    //     os: 'Android',
    //     osVersion: '10.14.6',
    //     appVersion: '1.0.0',
    //     firebaseToken: 'ej59N6AC8xA:APA91bGuLKLQg-9q8jsBOUra0MIkmz4agl2IgtRfnyAARtv0Ws0oAVI7YMtYBJkQKqoIxTrTyHRdLXpmyf1YidAPzkZxuAbcHls9pVnbTQHIl_znXnCL1Cfw2-2PN1sI1hPFBCLncr0b', // required: true
    //     lat: '20.560796',
    //     long: '106.076115'
    //   })
    // };
    // fetch('https://dev10api.ayainnovation.com/api/user/sendDeviceInfo', requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log("Response", data));
  }


  componentDidMount() {
    // window.addEventListener('load', this.handleLoad);
    //alert('componentDidMount')
  }

  handleLoad(event) {
    alert(event.data);
  }

  render() {

    window.addEventListener("message", message => {
      console.log("Message", message.data) // Wayne is coming!!!
    });

    return (
      <div>
        <Header />
        <div className="container" id="main">
          <FormIO src="https://xojgwtxalpylmpd.form.io/registration" onSubmit={(submission) => this.sendDeviceInfo(submission)} />
          <h6 id="test"></h6>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
