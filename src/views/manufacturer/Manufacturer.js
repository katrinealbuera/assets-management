import React, { Component } from "react";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CreateManufacturer from '../../js/actions/manufacturer/CreateManufacturer';
import setup from '../../js/setup/api';

class Manufacturer extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  };

  constructor(){
    super();
    this.getManufacturer = this.getManufacturer.bind(this);
  }
  componentDidMount() {
    this.getManufacturer();
  }

  getManufacturer(){
    this.setState({isLoading: true});

    setup.GetWithParameter(setup.BASE_URL + setup.Manufacturers, '?ShowAll=true')
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
              <h1 className="page-header">Manufacturer</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-5">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <p> List of Manufacturer </p>
                    </div>
                    <div className="panel-body">
                        <div>
                            <BootstrapTable
                                data={this.state.data}
                                hover
                                pagination>
                            <TableHeaderColumn isKey={true} dataField='name' editable={{type:'textarea'}} width="130">Manufacturer Name</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
          <CreateManufacturer getManufacturer={this.getManufacturer}/>
        </div>
      </div>
    );
  }
}

export default Manufacturer;