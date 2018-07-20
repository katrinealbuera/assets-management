import React, { Component } from "react";
import axios from "axios";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CreateSupplier from '../../js/actions/supplier/CreateSupplier';
import setup from '../../js/setup/api';

class Supplier extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  };

  constructor(){
    super();
    this.getProcessors = this.getProcessors.bind(this);
  }
  componentDidMount() {
    this.getProcessors();
  }


  getProcessors(){
    this.setState({isLoading: true});
    axios
      .get(setup.BASE_URL + setup.Suppliers)
      .then(response => {
        const newData = response.data.list;

        const newState = Object.assign({}, this.state, {
          data: newData,
          isLoading: false
        });
        this.setState(newState);
        })
      .catch(error => console.log(error));
  }

  render() {
    const { isLoading, error } = this.state;

    if (isLoading) {
      return <Code />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }
    
    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">Supplier</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-5">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <p> List of Supplier </p>
                    </div>
                    <div className="panel-body">
                        <div>
                            <BootstrapTable
                                data={this.state.data}
                                hover
                                pagination>
                            <TableHeaderColumn isKey={true} dataField='name' editable={{type:'textarea'}} width="130">Supplier Name</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
          <CreateSupplier getProcessors={this.getProcessors}/>
        </div>
      </div>
    );
  }
}

export default Supplier;