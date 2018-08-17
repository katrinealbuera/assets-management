import React, { Component } from "react";
import setup from '../../actions/setup/api';
import fieldname from '../../actions/setup/FieldNameResource';
import CreateVcard from '../sizes/CreateVideocard';
import { connect } from 'react-redux';
import { Code } from 'react-content-loader';
import { putAPI, getVCards, clearError } from '../../actions/assetAction';
import { validateSize } from '../../actions/validation/validateInput';
import { CommonRegisterForm, CommonRegisterFormHeader, CommonSuccessMessage } from '../common/component';

class Vcard extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      sizeId: null,
      errors: {},
      currentPage: '1',
      totalPage: '',
      total: '',
      errorMessage: '',
    }
  }

  onPageChange = (page) => {
    this.setState({currentPage: page})
    this.props.getVCards(page, false)
  }
  
  componentWillMount() {
    this.props.clearError()
    this.props.getVCards()
    this.setLoading()
  }

  setLoading() {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.setState({
          isLoading: false
      })
    }, 1000)
  }

  handleInputChange = (event) => {
    this.setState({ size : event.target.value})
  }
  
  isValid() {
    const { errors, isValid } = validateSize(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  handleEditBtnClick = (index, size, event) => {
    event.preventDefault();

    this.setState({
      sizeId: index,
      size: size
    });

    let newSize = {
      id: index,
      size: this.state.size
  }

    if (this.state.isEditing) {
      if (this.isValid()) { 
        this.props.putAPI(setup.BASE_URL + setup.Sizes.Videocard, index, newSize)
        .then(() => {
          this.props.getVCards(this.state.currentPage)
          this.showSuccessMessage()
          this.setState({sizeId: null, isEditing: false, errorMessage: ''})
        })
        .catch(error => {
          this.setState({size: this.state.size, errorMessage: error.response.data.errorMessages});
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
    }, 1000)
  }
  
  render() {
    
    const { errors } = this.state;

    var vcardsItem = this.props.vcards.map(function(props, index) {
        return(
            <tr key={index}>
              <td>{props.id}</td>
              { 
                (props.id === this.state.sizeId) ? 
                <td className="col-lg-6">
                  <input type="text" 
                        name="name" 
                        className="form-control"
                        defaultValue={props.size} 
                        onChange={this.handleInputChange}/>
                 <p style={setup.requiredInput}>{errors.size}</p>
                </td>
              :
                <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.size} {fieldname.FieldName.GBUnit}</p></td>       
              }
              <td>
                <input type="submit" 
                      value={this.state.sizeId !== props.id   ? 'Edit' : 'Save'} 
                      className="btn btn-success"
                      onClick={this.handleEditBtnClick.bind(this, props.id, props.size)}/>
              </td>
            </tr>
          );}, this); 
    
    return (
      this.state.isLoading ? <Code/> :
      <div>
          <div className="row">
              <div className="col-lg-12">
                  <h1 className="page-header">VideoCard</h1>
                     { CommonRegisterFormHeader(this.state.errorMessage) }
                     { this.state.isSaved && CommonSuccessMessage('updated') }
              </div>
          </div>
          <div className="row">
              { CommonRegisterForm('VideoCard', this.props.totalPage, this.props.currentPage, this.props.total,
                  this.onPageChange, vcardsItem) }
              <CreateVcard getVCards={this.getVCards}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    vcards: state.vcards.vcardList,
    isLoading: state.vcards.isLoading,
    currentPage: state.vcards.vcardCurrentPage,
    totalPage: state.vcards.vcardTotalPage,
    total: state.vcards.vcardTotal,
    page: state.page.page,
  })
  
  export default connect(mapStateToProps, { getVCards, putAPI, clearError })(Vcard);