import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home'
import RegistrationForm from './RegistrationForm';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';

const Main = () => (
    <main>
        <Switch>
 
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateForm} />
            <Route exact path="/update" component={UpdateForm} />
            <Route exact path="/form/:uniID/:formID" component={RegistrationForm} />
            
        </Switch>
    </main>
);

export default Main;