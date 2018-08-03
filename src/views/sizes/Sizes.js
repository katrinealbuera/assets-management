import React, { Component } from "react";
import CreateMemory from '../../js/actions/sizes/CreateMemory';
import CreateHarddisk from '../../js/actions/sizes/CreateHarddisk';
import CreateVideoCard from '../../js/actions/sizes/CreateVideocard';
import { connect } from 'react-redux';
import Error401 from '../../views/error/Error401';

class Sizes extends Component {

  render() {

    return (
      <div id="page-wrapper"> 
      {this.props.unauthenticated === 401 ? 
        <Error401/> :
      <div>
          <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">Sizes</h1>
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
  unauthenticated: state.unauthenticated.unauthenticatedError
})

export default connect(mapStateToProps)(Sizes);