import React, { Component } from "react";
import CreateProcessor from '../processor/CreateProcessor';
import setup from '../../actions/setup/api';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import Loader from '../common/Loader';
import { connect } from 'react-redux';
import { getProcessors, putAPI, clearError } from '../../actions/assetAction';
import { validateName } from '../../actions/validation/validateInput';
import { CommonRegisterForm, CommonRegisterFormHeader, CommonSuccessMessage } from '../common/component';

class Processor extends Component {

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
    this.props.getProcessors(page, false)
  }
  
  componentWillMount() {
    this.props.clearError()
    this.setState({isAuth: localStorage.getItem('user')})
    this.props.getProcessors()
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
    const { errors, isValid } = validateName(this.state, 30);

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
        this.props.putAPI(setup.BASE_URL + setup.Processors, index, newName)
        .then(() => {
          this.props.getProcessors(this.state.currentPage)
          this.showSuccessMessage()
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
                <h1 className="page-header">Processor</h1>
                { CommonRegisterFormHeader(this.state.errorMessage) }
                { this.state.isSaved && CommonSuccessMessage('updated') }
            </div>
        </div>
        <div className="row">
              { CommonRegisterForm('Processor', this.props.totalPage, this.props.currentPage, this.props.total,
                    this.onPageChange, processorItem) }
          <CreateProcessor getProcessor={this.getProcessor}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processors: state.processors.processorList,
  isLoading: state.processors.isLoading,
  currentPage: state.models.processorCurrentPage,
  totalPage: state.models.processorTotalPage,
  total: state.models.processorTotal,
  page: state.page.page,
  error: state.error.error,
  processorIsSuccess: state.processors.processorIsSuccess,
  unauthenticated: state.unauthenticated.unauthenticatedError,
  networkError: state.networkError.networkError,
})

export default connect(mapStateToProps, { getProcessors, putAPI, clearError })(Processor);