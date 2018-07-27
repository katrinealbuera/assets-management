import React, { Component } from "react";
import setup from '../../js/setup/api';
import { Code } from 'react-content-loader';
import CreateCategory from '../../js/actions/category/CreateCategory';
import { connect } from 'react-redux';
import { getCategories, putAPI } from '../../actions/assetAction';

class Category extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
    }
  }

  componentWillMount() {
    this.props.getCategories();
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
      this.props.putAPI(setup.BASE_URL + setup.Categories + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getCategories();
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

    var categoryItem = this.props.categories.map(function(props, index) {
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
              <h1 className="page-header">Category</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className="panel panel-info">
                  <div className="panel-heading">
                    <p> List of Category </p>
                  </div>
                    <div className="panel-body">
                        <div className="table-responsive table-bordered">
                          <form>
                          <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {categoryItem}
                                </tbody>
                            </table>
                          </form>
                        </div>
                    </div>
                </div>
            </div>
          <CreateCategory getCategories={this.getCategories}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoryList
})

export default connect(mapStateToProps, { getCategories, putAPI })(Category);