// default page
import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const API = 'https://jsonplaceholder.typicode.com/posts';

class Index extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.setState({isLoading: true});
    axios
      .get(API)
      .then(response => {
        const newData = response.data;

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
              <h1 className="page-header">Assets</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <BootstrapTable
                                // https://appdividend.com/2018/05/04/react-bootstrap-table2-example/
                                data={this.state.data}
                                striped
                                hover
                                pagination>
                            <TableHeaderColumn dataField='id' isKey={true} width="50">S/N</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">IT Asset Tag</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">Battery UnLT</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Adapter UnLT</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130" thStyle={ { whiteSpace: 'normal' } }>Hostname / Asset Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Assigned to</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">Delivery Date</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Model</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">CPU</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Model</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">RAM</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Video Card</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">HDD / SSD</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">PO #</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">DR #</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">SI #</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">MAC Address</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">IP Address</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}} width="130">Manufacturer</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}} width="130">Category</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Index;