import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from "connected-react-router";
import NavLink from './NavLink';
import { selectRoot, logout } from "react-formio";
import { AuthConfig } from "../config";

const Header = class extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { auth, logout, location } = this.props;

    // console.log("path", location.pathname)

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* <Link className="navbar-brand" to="/">
            <img className="logo" alt="Form.io" src="https://portal.form.io/images/formio-logo.png" height="25px" />
          </Link> */}
          <ul className="nav navbar-nav mr-auto">
            <NavLink exact to="/" role="navigation button" className="nav-link">
              <span className="fa fa-home" /> &nbsp; Home
            </NavLink>
            {/* <NavLink to="/create" role="navigation link" className="nav-link">
              <i className="fa fa-wpforms"></i>&nbsp;
                Create Form
            </NavLink> */}

            {/* <NavLink to="/update" role="navigation link" className="nav-link">
              <i className="fa fa-wpforms"></i>&nbsp;
                Update Form
            </NavLink> */}
          </ul>

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: selectRoot('auth', state)

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
      dispatch(push(AuthConfig.anonState));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
