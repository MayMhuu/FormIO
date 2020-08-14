import React from 'react'
import { Route } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
//import Form from './views/Form'
//import Event from './vews/Auth/Auth'
import { AppConfig } from './config';
import { Form } from 'react-formio';
import { FormBuilder } from 'react-formio';
import { Alert } from 'react-alert'

const App = () => (
  <div>
    <Header />


    <div className="container" id="main">
      {/* { AppConfiews/Event'
import Auth from './viig.projectUrl === 'https://xojgwtxalpylmpd.form.io' ?
        <div className="alert alert-warning">This app is still configured to use the default project. Be sure to create your own project in form.io and change the PROJECT_URL in src/config.js</div>
        : null
      } 
       <Route exact path="/" component={Home} />
      <Route path="/form" component={Form} />
      <Route path="/event" component={Event} />
      <Route path="/auth" component={Auth} /> */}
      {/* <h2>Person Data</h2>
      <Form src="https://xojgwtxalpylmpd.form.io/person" onSubmit={
        function (submission) {
          console.log(submission)
        }
      } /> */}
      <h2>Customer Data</h2>

      <Form src="https://xojgwtxalpylmpd.form.io/customer" onCustomEvent={() => alert.show('Oh look, an alert!')} />
      {/* <FormBuilder form={{ display: 'form' }} onChange={(schema) => console.log(schema) (submit)="onSubmit($event.data)}
       />
     */}

      <button
        onClick={() => {
        //  Alert.alert("Are you sure?", "You can't be serious.")

        }}
      >
        Show Alert
  </button>
    </div>
    {/* <Footer /> */}
  </div>
)
const callAPI = () => {
  console.log("fhrtyrtyrty")

  // fetch('https://dev10api.ayainnovation.com/api/user/login', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': ' hQCOKs75uoYxakySqIA7qrjzdj2Z9PYn'
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
  // });
}


export default App
