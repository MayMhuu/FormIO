import React, { useState } from "react";
import { Route, Link, BrowserRouter, Switch, Router, withRouter, matchPath } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
import RegistrationForm from './views/RegistrationForm';
import CreateForm from './views/CreateForm';
import UpdateForm from './views/UpdateForm';
import FormList from './views/FormList';

const App = (props) => {
  console.log("PatheName", props.location.pathname)
 
  return (
    < BrowserRouter >
      <div class="App">
        {
          !props.location.pathname.includes('form') ? <Header /> : <Footer />
        }


        <Route exact path="/" component={Home} />
        <Route exact path="/list/:universityId/:universityName" component={FormList} />
        <Route exact path="/create/:universityId/:universityName" component={CreateForm} />
        <Route exact path="/update/:formId/:formName" component={UpdateForm} />
        <Route exact path="/form/:formID" component={RegistrationForm} />

        {
          !props.location.pathname.includes('list') ? <Footer /> : ''
        }
      </div>
    </ BrowserRouter >

    // <BrowserRouter>
    //   <div>
    //     <PrivateRoute path='/home' authed={auth}>
    //       <Navigation>
    //         <Route component={Home} path="/home" />
    //       </Navigation>
    //     </PrivateRoute>
    //   </div>
    // </BrowserRouter>
  )
  
};

// <Route
// exact path="/"
// component={matchStateToProps(InitialAppState, {
//   routeOpen: true // no auth is needed to access this route
// })} />


export default withRouter(App);



