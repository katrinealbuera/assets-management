import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/assetAction';

class Logout extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(null, { signOut })(Logout);
