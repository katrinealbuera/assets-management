import React, { Component } from "react";
import setup from '../../actions/setup/api';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import CreateSupplier from '../supplier/CreateSupplier';
import Loader from '../common/Loader';
import { connect } from 'react-redux';
import { getSuppliers, putAPI, clearError } from '../../actions/assetAction';
import { validateName } from '../../actions/validation/validateInput';
import { CommonRegisterForm, CommonRegisterFormHeader, CommonSuccessMessage } from '../common/component';

class Supplier extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      isSaved: false,
      nameId: null,
      errors: {},
      currentPage: '1',
      totalPage: '',
      total: '',
      errorMessage: '',
      isAuth: '',
    }
  }

  onPageChange = (page) => {
    this.setState({currentPage: page})
    this.props.getSuppliers(page, false)
  }

  componentWillMount() {
    this.props.clearError()
    this.setState({isAuth: localStorage.getItem('user')})
    this.props.getSuppliers()
    this.setLoading()
  }

  setLoading() {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({
          isLoading: false
      })
    }, 2000)
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  isValid() {
    const { errors, isValid } = validateName(this.state, 100);

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
        this.props.putAPI(setup.BASE_URL + setup.Suppliers, index, newName)
        .then(() => {
          this.props.getSuppliers(this.state.currentPage);
          this.showSuccessMessage();
          this.setState({nameId: null, isEditing: false, errorMessage: ''})
        })
        .catch(error => {
          this.setState({name: this.state.name, errorMessage: error.response.data.errorMessages});
      })
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  showSuccessMessage = () => {
    this.setState({isSaved: true})

    setTimeout(() => {
        this.setState({
            isSaved: false
        })
    }, 2000)
  }

  render() 
  {
    const { errors, isAuth } = this.state;
    
    var supplierItem = this.props.suppliers.map(function(props, index) {
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
                  className="btn btn-info"
                  onClick={this.handleEditBtnClick.bind(this, props.id, props.name)}/>
          </td>
        </tr>
      );}, this); 

    return (
      this.props.networkError ? <ErrorNetwork/> : (this.props.unauthenticated === 401 || !isAuth) ? <Error401/> :
      this.state.isLoading ? <Loader/> :
      <div id="page-wrapper">
        <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">Supplier</h1>
                { CommonRegisterFormHeader(this.state.errorMessage) }
                { this.state.isSaved && CommonSuccessMessage('updated') }
            </div>
        </div>
        <div className="row">
            { CommonRegisterForm('Supplier', this.props.totalPage, this.props.currentPage, this.props.total,
                  this.onPageChange, supplierItem) }
            <CreateSupplier getSupplier={this.getSupplier}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  suppliers: state.suppliers.supplierList,
  isLoading: state.suppliers.isLoading,
  unauthenticated: state.unauthenticated.unauthenticatedError,  
  currentPage: state.suppliers.supplierCurrentPage,
  totalPage: state.suppliers.supplierTotalPage,
  total: state.suppliers.supplierTotal,
  page: state.page.page,
  error: state.error.error,
  supplierIsSuccess: state.suppliers.supplierIsSuccess,
})

export default connect(mapStateToProps, { getSuppliers, putAPI, clearError })(Supplier);