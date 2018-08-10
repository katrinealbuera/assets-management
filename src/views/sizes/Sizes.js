import React, { Component } from "react";
import CreateMemory from '../../js/actions/sizes/CreateMemory';
import CreateHarddisk from '../../js/actions/sizes/CreateHarddisk';
import CreateVideoCard from '../../js/actions/sizes/CreateVideocard';
import { clearError } from '../../actions/assetAction';
import { connect } from 'react-redux';
import Error401 from '../../views/error/Error401';

class Sizes extends Component {
  componentWillMount() {
      this.props.clearError()
  }

  render() {

    var isAuth = localStorage.getItem('user');

    return (
      <div id="page-wrapper"> 
      {this.props.unauthenticated === 401 || !isAuth ? 
        <Error401/> :
      <div>
          <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">Sizes</h1>
              {this.props.error ? <p className="alert alert-danger">{this.props.error.errorMessages}</p>: null }
          </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="panel">
                    <div className="panel-body">
                      <div className="row">
                          <CreateMemory/>
                          <CreateHarddisk/>
                          <CreateVideoCard/>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unauthenticated: state.unauthenticated.unauthenticatedError,
  error: state.error.error
})

export default connect(mapStateToProps, {clearError})(Sizes);