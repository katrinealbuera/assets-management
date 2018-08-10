import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

const rootStyle = {
  textAlign: 'center',
  fontSize: '100px',
  color: 'red',
  margin: '150px 0 -10px',
  paddingBottom: '15px',
}

const pStyle = {
  textAlign: 'center',
  fontSize: '20px',
}

export default class Error401 extends Component {
  render() {
    return (
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 style={rootStyle}>Error</h1>
                  <p style={pStyle}>Unauthorized Access.</p>
                  <p style={pStyle}>Click <NavLink to="/">here</NavLink> to go back home</p>
              </div>
          </div>
      </div>
    )
  }
}
