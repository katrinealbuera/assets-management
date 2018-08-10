import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

const rootStyle = {
  textAlign: 'center',
  fontSize: '100px',
  color: 'red',
  margin: '250px 0 -10px',
  paddingBottom: '15px',
}

const pStyle = {
  textAlign: 'center',
  fontSize: '20px',
}

export default class Error extends Component {
  render() {
    return (
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 style={rootStyle}>Error 404</h1>
                  <p style={pStyle}>Oops, the page you are looking for does not exist.</p>
                  <p style={pStyle}>Click <NavLink to="/">here</NavLink> to go back home</p>
              </div>
          </div>
      </div>
    )
  }
}
