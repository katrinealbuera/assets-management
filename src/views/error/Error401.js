import React, { Component } from 'react';
import setup from '../../actions/setup/api';
import { NavLink } from "react-router-dom";

export default class Error401 extends Component {

  clearStorage = () => {
    localStorage.clear()
    window.location.reload(true)
}

  render() {
    return (
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 style={setup.rootStyle}>Error 401</h1>
                  <p style={setup.pStyle}><i className="fa fa-exclamation-triangle" style={setup.requiredInput}></i> Access Denied</p>
                  <p style={setup.pStyle} onClick={this.clearStorage}>Click <NavLink to="/">here</NavLink> to go back home</p>
              </div>
          </div>
      </div>
    )
  }
}
