import React, { Component } from "react";
import setup from '../../js/setup/api';
import { Code } from 'react-content-loader';
import CreateCategory from '../../js/actions/category/CreateCategory';
import { connect } from 'react-redux';
import { getCategories, putAPI, clearError } from '../../actions/assetAction';
import { validateName } from '../../js/validation/validateInput';
import Error401 from '../../views/error/Error401';
import { CommonPager } from '../common/pager';

class Category extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
      errors: {},
      currentPage: '',
      totalPage: '',
      total: '',
    }
  }

  onPageChange = (page) => {
    this.props.getCategories(page, false)
  }

  componentWillMount() {
    this.props.clearError()
    this.setState({isLoading:true})
    this.props.getCategories();
    this.setState({isLoading:false})
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  isValid() {
    const { errors, isValid } = validateName(this.state, 20);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
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
      if (this.isValid()) {
        this.props.putAPI(setup.BASE_URL + setup.Categories, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getCategories();
        })
        .catch(error => console.log(error));
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  render() {
    if (!this.props.unauthenticated === 401) {
      const { isLoading } = this.props;
      if (isLoading) {
       return <Code/>;
      }
    }

    const { errors } = this.state;

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
                    <p style={setup.requiredInput}>{errors.name}</p>
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
      {this.props.unauthenticated === 401 ? 
        <Error401/> :
      <div>
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">Category</h1>
                {this.props.error ? <p className="alert alert-danger">{this.props.error.errorMessages}</p>: null }
            </div>
          </div>
          <div className="row">
              <div className="col-lg-6">
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <p> List of Category </p>
                    </div>
                      <div className="panel-body">
                          <div className="table table-striped table-hover table-borderless">
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
                              {(this.props.totalPage && this.props.currentPage) 
                                  && CommonPager(this.props.total, this.props.currentPage, this.onPageChange)}
                            </form>
                          </div>
                      </div>
                  </div>
              </div>
            <CreateCategory getCategories={this.getCategories}/>
          </div>
        </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoryList,
  isLoading: state.categories.isLoading,
  unauthenticated: state.unauthenticated.unauthenticatedError,
  currentPage: state.categories.categoryCurrentPage,
  totalPage: state.categories.categoryTotalPage,
  total: state.categories.categoryTotal,
  page: state.page.page,
      error: state.error.error
})

export default connect(mapStateToProps, { getCategories, putAPI, clearError })(Category);