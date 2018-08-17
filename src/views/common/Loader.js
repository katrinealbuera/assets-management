import React, { Component } from 'react';
import { Code } from 'react-content-loader';

export default class Loader extends Component {
  render() {
    return (
        <div id="page-wrapper">
            <Code/>
        </div>
    )
  }
}
