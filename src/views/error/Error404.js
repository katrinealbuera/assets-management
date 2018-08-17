import React, { Component } from 'react';
import setup from '../../actions/setup/api';
import { NavLink } from "react-router-dom";

export default class Error404 extends Component {
  render() {
    return (
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 style={setup.rootStyle}>Error 404</h1>
                  <p style={setup.pStyle}><i className="fa fa-exclamation-triangle" style={setup.requiredInput}> </i>   
                        Oops, the page you are looking for does not exist.</p>
                  <p style={setup.pStyle}>Click <NavLink to="/">here</NavLink> to go back home</p>
              </div>
          </div>
      </div>
    )
  }
}
