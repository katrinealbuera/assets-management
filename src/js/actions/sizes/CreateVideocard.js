import React, { Component } from "react";
import setup from '../../setup/api';
import Vcard from '../../../views/sizes/Vcard';
import { connect } from 'react-redux';
import { Code } from 'react-content-loader';
import { putAPI, getVCards } from '../../../actions/assetAction';
import { validateSize } from '../../validation/validateInput';
import { CommonPager } from '../../../views/common/pager';

class CreateVcard extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      sizeId: null,
      errors: {},
      currentPage: '',
      totalPage: '',
      total: '',
    }
  }

  onPageChange = (page) => {
    this.props.getVCards(page, false)
  }
  
  componentWillMount() {
    this.setState({isLoading:true})
    this.props.getVCards();
    this.setState({isLoading:false})
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
        .then(response => {
          this.setState({sizeId: null, isEditing: false})
        })
        .then(() => {
          this.props.getVCards();
        })
        .catch(error => console.log(error));
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  render() {
    
    const {isLoading} = this.props;
    const { errors } = this.state;
		
    if (isLoading) {
    return <Code/>;
    }

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
                <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.size} {setup.FieldName.GBUnit}</p></td>       
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
      <div className="col-lg-4">
      <div className="panel panel-info">
          <div className="panel-heading">
              <p>Videocard</p>
          </div>
          <div className="panel-body">
              <div className="table-responsive table-bordered">
                <Vcard getDisks={this.getDisks}/>
                  <div className="panel panel-success">
                      <div className="panel-heading">
                          <p> Edit Videocard Size </p>
                      </div>
                      <table className="table table-striped table-hover table-borderless">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Size</th>
                                  <th>Edit</th>
                              </tr>
                          </thead>
                          <tbody>
                              { vcardsItem }
                          </tbody>
                      </table>
                      {(this.props.totalPage && this.props.currentPage) 
                          && CommonPager(this.props.total, this.props.currentPage, this.onPageChange)}
                  </div>
              </div>
          </div>
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
  
  export default connect(mapStateToProps, { getVCards, putAPI })(CreateVcard);