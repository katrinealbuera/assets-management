import React, { Component } from 'react';
import setup from '../../actions/setup/api';

export default class Error extends Component {
  render() {
    return (
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 style={setup.rootStyle}>Error 503</h1>
                  <p style={setup.pStyle}>
                      <i className="fa fa-exclamation-triangle" style={setup.requiredInput}></i> Service temporary unavailable.
                  </p>
              </div>
          </div>
      </div>
    )
  }
}
