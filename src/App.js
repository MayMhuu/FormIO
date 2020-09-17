import React, { useState } from "react";
import { Route, HashRouter, Link, BrowserRouter, Switch, Router, withRouter, matchPath } from 'react-router-dom'
import Header from './containers/Header'
import Footer from './containers/Footer'
import Home from './views/Home'
import RegistrationForm from './views/RegistrationForm';
import CreateForm from './views/CreateForm';
import UpdateForm from './views/UpdateForm';
import FormList from './views/FormList';
import ImageUpload from './views/ImageUpload';
//import './App.scss';

const App = (props) => {
  console.log("PatheName", props.location.pathname)

  return (
    // < BrowserRouter >
    //   <div class="main" style={{ overflow: 'hidden' }}>
    //     {
    //       !props.location.pathname.includes('/') ? <Header /> : <Footer />
    //     }
    //     <Route exact path="/home" component={Home} />
    //     <Route exact path="/list/:universityId/:universityName" component={FormList} />
    //     <Route exact path="/create/:universityId/:universityName" component={CreateForm} />
    //     <Route exact path="/update/:formId/:formName" component={UpdateForm} />
    //     <Route exact path="/form/:formID" component={RegistrationForm} />
    //     {
    //       !props.location.pathname.includes('form') ? <Footer /> : ''
    //     }
    //   </div>
    // </ BrowserRouter >

    <HashRouter>
      <Switch>
        <div class="main" style={{ overflow: 'hidden' }}>
          {
            !props.location.pathname.includes('/form') ? <Header /> : ''
          }
          <Route exact path="/" component={Home} />
          <Route exact path="/list/:universityId/:universityName" component={FormList} />
          <Route exact path="/create/:universityId/:universityName" component={CreateForm} />
          <Route exact path="/update/:formId/:formName" component={UpdateForm} />
          <Route exact path="/form/:formID" component={RegistrationForm} />
        </div>
      </Switch>
    </HashRouter>

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


export default withRouter(App);



