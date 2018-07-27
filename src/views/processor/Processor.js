import React, { Component } from "react";
import { Code } from 'react-content-loader';
import CreateProcessor from '../../js/actions/processor/CreateProcessor';
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getProcessors, putAPI } from '../../actions/assetAction';

class Processor extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
    }
  }

  componentWillMount() {
    this.props.getProcessors();
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  handleEditBtnClick = function(index, name, event) {
    event.preventDefault();

    this.setState({
      nameId: index,
      name: name
    });

    let newName = {
      id: index,
      name: this.state.name
  }

    if (this.state.isEditing) {
      this.props.putAPI(setup.BASE_URL + setup.Processors + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getProcessors();
        })
        .catch(error => console.log(error));
    }

    this.setState({isEditing: true})

  }


  render() {
    const { isLoading, error } = this.state;

    if (isLoading) {
      return <Code />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }

    var processorItem = this.props.processors.map(function(props, index) {
      return(
        <tr key={index}>
          <td>{props.id}</td>
          { 
            (props.id === this.state.nameId) ? 
            <td className="col-lg-6">
              <input type="text" 
                    name="name" 
                    className="form-control"
                    defaultValue={props.name} 
                    onChange={this.handleInputChange}/>
            </td>
          :
            <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.name}</p></td>       
          }
          <td>
            <input type="submit" 
                  value={this.state.nameId !== props.id   ? 'Edit' : 'Save'} 
                  className="btn btn-success"
                  onClick={this.handleEditBtnClick.bind(this, props.id, props.name)}/>
          </td>
        </tr>
      );}, this); 
    
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
                    <div className="table-responsive table-bordered">
                      <form>
                      <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Processor</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                              { processorItem }
                            </tbody>
                        </table>
                      </form>
                    </div>
                </div>
                </div>
            </div>
          <CreateProcessor getProcessor={this.getProcessor}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processors: state.processors.processorList
})

export default connect(mapStateToProps, { getProcessors, putAPI })(Processor);