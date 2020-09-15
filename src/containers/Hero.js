import React, {Component} from 'react';
import { Form as FormIO } from 'react-formio';

export default class Hero extends Component {
  render() {
    return (
      <div className="jumbotron text-center" style={{'marginTop': '-40px'}}>
        <h2 className="title">
          Welcome to your &lt;
          <span className="text-blue">form</span>
          .
          <span className="text-green">io</span>
          &gt; application!
        </h2>
        <h3>
          using
          <img alt="React" src="https://cdn.worldvectorlogo.com/logos/react.svg" className="hero-image" width="100" />
          React
        </h3>
        <div className="row">
          <div className="col-sm-12 col-sm-offset-3 text-center">
            <p className="lead">
              You can easily embed your Forms and Resources into this application using.
            </p>
            <div>
              <pre><code>{'<Form src="https://examples.form.io/example" />'}</code></pre>
            </div>
            <p className="lead">Need Help?</p>F
            <ul className="list-inline">
              <li>
                <a className="btn btn-lg btn-success" target="_blank" rel="noopener noreferrer" href="https://example.com">Embedding</a>
              </li>
              <li>
                <a className="btn btn-lg btn-success" target="_blank" rel="noopener noreferrer" href="http://help.form.io">Documentation</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
