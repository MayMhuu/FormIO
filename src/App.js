import React, { useState } from "react";
import { Route } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
import Form from './views/Form'
import Event from './views/Event'
import Auth from './views/Auth/Auth'
import { AppConfig } from './config';
import { Form as FormIO } from 'react-formio';
import { FormBuilder } from 'react-formio';
import { Alert } from 'react-alert'
import { ExternalLink } from 'react-external-link';

//const [submission, setSubmission] = useState({});

// const App = () => (

//   <div>
//     {/* <Header /> */}


//     <div className="container" id="main">
//       {/* { AppConfig.projectUrl === 'https://reactstarter.form.io' ?
//         <div className="alert alert-warning">This app is still configured to use the default project. Be sure to create your own project in form.io and change the PROJECT_URL in src/config.js</div>
//         : null
//       }

//       <Route exact path="/" component={Home} />
//       <Route path="/form" component={Form} />
//       <Route path="/event" component={Event} />
//       <Route path="/auth" component={Auth} /> */}

//       {/* <h2>Person Data</h2> */}
//       {/* <a href="https://example.com">link text</a> */}
//       <FormIO src="https://xojgwtxalpylmpd.form.io/registration" onSubmit={(submission) => sendDeviceInfo(submission)} />
//       {
//         WarningBanner()
//       }

//       {/* <h2>Fill your personal informations</h2>

//       <Form src="https://xojgwtxalpylmpd.form.io/registeration" onSubmit={(event) => handleChange(event)} onClick={click} /> */}

//       {/* <FormIO src="https://xojgwtxalpylmpd.form.io/customer"
//       onSubmit={a => {
//         console.log(a);
//       }}
//       onSubmitDone={a => {
//         console.log(a);
//       }}
//       onCustomEvent={customEvent => {
//         console.log(customEvent);
//        // setSubmission({ ...customEvent.data, lastName: "Laaast Name" });
//       }} 


//      /> */}



//       {/* <Form form={{ onCustomEvent={ customEvent => {console.log(customEvent)}}}/> */}
//     </div>
//     {/* <Footer /> */}
//   </div>
// )

const sendDeviceInfo = (event) => {
  // Simple POST request with a JSON body using fetch
  console.log("Success")


  // return (
  //   //<Route exact path="/" render={() => (window.location = "https://xojgwtxalpylmpd.form.io/customer")} />
  //   //  <ExternalLink href="https://example.com" />
  //   <a href="https://example.com">link text</a>
  //   // // <Route exact path="/" component={Home} />
  //   // <FormIO src="https://xojgwtxalpylmpd.form.io/registeration" />


  // )

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

const login = () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic hQCOKs75uoYxakySqIA7qrjzdj2Z9PYn'
    },
    body: JSON.stringify({
      phone: '09789789789',
      password: '123457',
      deviceId: '5b4588ba164e12f6345',
      firebaseToken: 'ej59N6AC8xA:APA91bGuLKLQg-9q8jsBOUra0MIkmz4agl2IgtRfnyAARtv0Ws0oAVI7YMtYBJkQKqoIxTrTyHRdLXpmyf1YidAPzkZxuAbcHls9pVnbTQHIl_znXnCL1Cfw2-2PN1sI1hPFBCLncr0b'
    })
  };
  fetch('https://dev10api.ayainnovation.com/api/user/login', requestOptions)
    .then(response => response.json())
    .then(data => console.log("Response", data));

}

const handleChange = (event) => {
  console.log("Change", event)
  event.preventDefault();
}

const WarningBanner = () => {
  return (
    <div class='text-green'>
      <h4>gdkfjhgjkfghfkj</h4>
    </div>
  );
}


class App extends React.Component {
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
        {/* <Header /> */}


        <div className="container" id="main">
          {/* { AppConfig.projectUrl === 'https://reactstarter.form.io' ?
          <div className="alert alert-warning">This app is still configured to use the default project. Be sure to create your own project in form.io and change the PROJECT_URL in src/config.js</div>
          : null
        }
        
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="/event" component={Event} />
        <Route path="/auth" component={Auth} /> */}


          {
            !this.state.show ?
              <FormIO src="https://xojgwtxalpylmpd.form.io/registration" onSubmit={(submission) => this.sendDeviceInfo(submission)} />
              :
              <Route exact path="/" render={() => (window.location = "https://example.com")} />
          }
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default App
