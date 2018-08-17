import React, { Component } from "react";
import Memory from '../sizes/Memory';
import Harddisk from '../sizes/Harddisk';
import Vcard from '../sizes/Vcard';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import { clearError } from '../../actions/assetAction';
import { connect } from 'react-redux';

class Sizes extends Component {

  constructor(){
    super();

    this.state = { 
      value: 'select',
      isAuth: '',
    }
  }

  componentWillMount() {
      this.props.clearError()
      this.setState({isAuth: localStorage.getItem('user')})
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {

    const { isAuth } = this.state;

    return (
      this.props.networkError ? <ErrorNetwork/> : (this.props.unauthenticated === 401 || !isAuth) ? <Error401/> :
      <div id="page-wrapper"> 
        <div className="row">
            <div className="col-lg-12">
                <div className="form-group">
                    <h1 className="page-header">Sizes</h1>
                </div>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <div className="form-group">
                    <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                      <option value="0">Select</option>
                      <option value="1">Memory</option>
                      <option value="2">Harddisk</option>
                      <option value="3">Videocard</option>
                    </select>
                </div>
            </div>
        </div>

      { this.state.value === '1' ? <Memory/> 
      : this.state.value === '2' ? <Harddisk/>
      : this.state.value === '3' ? <Vcard/> : null }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  unauthenticated: state.unauthenticated.unauthenticatedError,
  networkError: state.networkError.networkError,
})

export default connect(mapStateToProps, {clearError})(Sizes);