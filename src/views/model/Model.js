import { Code } from 'react-content-loader';
import React, { Component } from "react";
import CreateModel from '../../js/actions/model/CreateModel';
import setup from '../../js/setup/api';

export default class Model extends Component {

  constructor()
  {
    super();

    this.state = {
      data: [],
      isEditing: false,
      isEditingId: null,
      isLoading: true,
      error: null
    };

    this.getModels = this.getModels.bind(this);
  }
  
  handleSubmit = event => {
    event.preventDefault();

    setup.PostFunction(setup.BASE_URL + setup.Models, this.state.name)
    .then(response => {
        console.log(response);
        console.log(response.data);
        this.props.getModels();
      })
    }

  handleInputChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleEditBtnClick = function(index, name, event) {

    event.preventDefault();

    this.setState({isEditingId: index, name: name})

    let newName = {
      id: index,
      name: this.state.name
    }

    if (this.state.isEditing){
      setup.PutFunction(setup.BASE_URL + setup.Models, setup.Id + index, newName)
      .then(response => {
        const updatedModel = newName.name;

        const newState = Object.assign({}, this.state, {
          name: updatedModel,
          isEditingId: null,
          isEditing:false
        });
        this.setState(newState);

        console.log(newState);
        this.getModels();
      })
      .catch(error => console.log(error));
    }
      this.setState({isEditing: true})
  }

  componentDidMount() 
  {
    this.getModels();
  }

  getModels()
  {
    setup.GetWithParameter(setup.BASE_URL + setup.Models, setup.ShowAll + 'true')
      .then(response => {
        const newData = response.data.list;

        const newState = Object.assign({}, this.state, {
          data: newData,
          isLoading: false,
          isEditingId: null
      });
        this.setState(newState);
        console.log(newState);
      })
      .catch(error => console.log(error));
  }

  render() 
  {
    const {isLoading} = this.state;

    if (isLoading) 
    {
      return <Code />;
    }

    var modelItem = this.state.data.map(function(props, index) {
      return(
        <tr key={index}>
          <td>{props.id}</td>
          { 
            (props.id === this.state.isEditingId) ? 
            <td className="col-lg-6">
              <input type="text" 
                    name="name" 
                    className="form-control .col-md-4"
                    defaultValue={props.name} 
                    onChange={this.handleInputChange}/>
            </td>
          :
            <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.name}</p></td>       
          }
          <td>
            <input type="submit" 
                  value={this.state.isEditingId !== props.id   ? 'Edit' : 'Save'} 
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