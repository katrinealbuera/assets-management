import React, { Component } from "react";
import setup from '../../js/setup/api';
import CreateModel from '../../js/actions/model/CreateModel';
import { connect } from 'react-redux';
import { getModels, putAPI } from '../../actions/assetAction';

class Model extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
      activePage: 10
    }
  }

  handlePageChange(pageNumber){
    this.setState({
      activePage: pageNumber
    });
  }

  componentWillMount() {
    this.props.getModels();
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
      this.props.putAPI(setup.BASE_URL + setup.Models + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getModels();
        })
        .catch(error => console.log(error));
    }

    this.setState({isEditing: true})

  }

  render() 
  {
    var modelItem = this.props.models.map(function(props, index) {
      return(
        <tr key={'model_'+index}>
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
              <h1 className="page-header">Model</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <p> List of Model </p>
              </div>
                <div className="panel-body">
                    <div className="table-responsive table-bordered">
                      <form>
                      <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Model Name</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                              { modelItem }
                            </tbody>
                        </table>
                      </form>
                    </div>
                </div>
            </div>
        </div>
          <CreateModel getModels={this.getModels}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  models: state.models.modelList
})

export default connect(mapStateToProps, { getModels, putAPI })(Model);