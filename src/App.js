import React, { useState } from "react";
import { Route, HashRouter, Link, BrowserRouter, Switch, Router, withRouter, matchPath } from 'react-router-dom'
import Header from './containers/Header'
import Home from './views/Home'
import RegistrationForm from './views/Forms.js/RegistrationForm';
import LanguageForm from './views/Forms.js/LanguageForm';
import CreateForm from './views/CreateForm';
import UpdateForm from './views/UpdateForm';
import FormList from './views/FormList';
import './App.scss';

const App = (props) => {
  console.log("PatheName", props.location.pathname)

  return (
    <HashRouter>
      <Switch>
        <div style={{ overflow: 'hidden' }}>
          {/* {
            !props.location.pathname.includes('/form') ? <Header /> : ''
          } */}
          <Header /> 
          <Route exact path="/" component={Home} />
          <Route exact path="/list/:universityId/:universityName" component={FormList} />
          <Route exact path="/create/:universityId/:universityName" component={CreateForm} />
          <Route exact path="/update/:formId/:formName" component={UpdateForm} />
          <Route exact path="/form/:formID" component={RegistrationForm} />
          <Route exact path="/language" component={LanguageForm} />
        </div>
      </Switch>
    </HashRouter>
  )

};


export default withRouter(App);



