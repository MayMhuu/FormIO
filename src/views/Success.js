import React, {Component} from 'react';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types';
import Hero from '../containers/Hero';
import { selectRoot } from "react-formio";
import { FormBuilder } from 'react-formio';
import { Form as FormIO } from 'react-formio';
import { Route } from 'react-router-dom'


class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    return (
      <div>
          Success
      </div>
    )
  }
}

export default Success
