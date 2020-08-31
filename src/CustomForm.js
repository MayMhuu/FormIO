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


// var enteronce = false;

// onNavigationStateChange = (webView) => {
//     if (enteronce == false && webView.url.includes("PAGE LINK WHERE YOU OPEN CAMERA AND GALLERY")) {
//         enteronce = true;
//         // enteronce is to enter inside the code and ask permissions only once or else the page will continue to ask permission

//         this.requestCameraAndGalleryPermission();
//     }
//     else {
//         enteronve = false;
//     }
// }
// requestCameraAndGalleryPermission = () => {
//     try {
//         var permission = PermissionsAndroid.check(
//             PermissionsAndroid.PERMISSIONS.CAMERA && PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//         );
//         console.log("camera && gallery permission granted:- ", permission);
//         if (!permission) {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.CAMERA && PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//             );
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 console.log('Camera && Gallery permissions granted');
//             } else {
//                 console.log('Camera && Gallery permission denied');
//             }
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }


export default CustomForm;