import React, { Component } from "react";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CreateProcessor from '../../js/actions/processor/CreateProcessor';
import setup from '../../js/setup/api';

class Processor extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  };

  constructor(){
    super();
    this.getProcessor = this.getProcessor.bind(this);
  }
  componentDidMount() {
    this.getProcessor();
  }


  getProcessor(){
    this.setState({isLoading: true});

    setup.GetWithParameter(setup.BASE_URL + setup.Processors, '?ShowAll=true')
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
              <h1 className="page-header">Processor</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-5">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <p> List of Processor </p>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <BootstrapTable
                                data={this.state.data}
                                hover>
                            <TableHeaderColumn isKey={true} dataField='name' editable={{type:'textarea'}} width="130">Processor Name</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
          <CreateProcessor getModels={this.getProcessor}/>
        </div>
      </div>
    );
  }
}

export default Processor;