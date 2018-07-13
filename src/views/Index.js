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

    const selectRow = {
        mode: 'checkbox'
    };

    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">Tables</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        DataTables Advanced Tables
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <BootstrapTable
                                // https://appdividend.com/2018/05/04/react-bootstrap-table2-example/
                                data={this.state.data}
                                selectRow={selectRow}
                                striped
                                hover
                                pagination
                                insertRow
                                deleteRow>
                            <TableHeaderColumn dataField='id' isKey={true} width="30">ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='title' editable={{type:'textarea'}}>Title</TableHeaderColumn>
                            <TableHeaderColumn dataField='body' editable={{type:'textarea'}}>Body</TableHeaderColumn>
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