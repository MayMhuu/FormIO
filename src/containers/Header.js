import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NavLink from './NavLink';

const Header = class extends Component {

  render() {
    // console.log("path", location.pathname)

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <div class="row">
          <div class="col-lg-1"></div>
          <div clas="col-lg-11">
            <ul className="nav navbar-nav mr-auto " >
              <NavLink exact to="/" role="navigation button" className="nav-link" style={{ textAlign: 'center' }}>
                <span className="fa fa-home" /> &nbsp; Home
              </NavLink>

              {/* <NavLink to="/update" role="navigation link" className="nav-link">
              <i className="fa fa-wpforms"></i>&nbsp;
                Update Form
            </NavLink> */}
            </ul>
          </div>
        </div>

      </nav>
    );
  }
}


export default Header
