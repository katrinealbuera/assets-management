import React, { Component } from "react";
import setup from '../../actions/setup/api';
import { connect } from 'react-redux';
import { getVCards, postAPI } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';
import { CommonSuccessMessage } from '../common/component';

class CreateVcard extends Component{
    constructor(props){
        super(props);

        this.state = {
            isValidForm: false,
            isSaved: false,
            size: '',
            errorMessage:'',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newSize = {
            size: this.state.size
        }

        if(this.state.isValidForm) {
        this.props.postAPI(setup.BASE_URL + setup.Sizes.Videocard, newSize)
            .then(() => {
                this.props.getVCards(this.props.totalPage);
                this.showSuccessMessage();
                this.setState({size: '', errorMessage: ''});
            })
            .catch(error => {
                this.setState({size: this.state.size, errorMessage: error.response.data.errorMessages});
            });
        }
    }

    showSuccessMessage = () => {
        this.setState({isSaved: true})
    
        setTimeout(() => {
            this.setState({
                isSaved: false
            })
        }, 2000)
      }

    render(){
        return(
<div className="col-lg-6">
    {this.state.errorMessage ? <p className="alert alert-danger">{this.state.errorMessage}</p>: null }
    <div className="panel panel-green">
        <div className="panel-heading">
            <p> Add New Videocard </p>
        </div>

        <div className="panel-body">
            <div className="row">
            { this.state.isSaved && CommonSuccessMessage('saved') }
              <div className="col-lg-12">
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-hover">
                        <thead>
                          <tr>
                              <th>Size</th>
                              <th>Add</th>
                          </tr>
                        </thead>
                        <tbody>
                              <tr>
                                  <td>
                                      <Textbox
                                            tabIndex="1" id={'size'} name="name" type="text" value={this.state.size} 
                                            onChange={(size, e) => {
                                            if (isNaN(size) || size.length > 5 || !size){
                                                this.setState({ size, hasError: true, isValidForm: false })
                                            }
                                            else {
                                                this.setState({ size, hasError: false, isValidForm: true })
                                            }
                                            }} 
                                            onBlur={() => {}}
                                            validationOption={{
                                                name: 'Size',
                                                type: 'number',
                                                check: true, 
                                                required: true,
                                      }} />
                                  </td>
                                  <td>
                                      <input type="submit" value="Add" className={this.state.size && !this.state.hasError
                                          ? 'btn btn-success' : 'btn btn-success disabled'}/>
                                  </td>
                              </tr>
                        </tbody>
                    </table>
                </form>
              </div>
            </div>
        </div>
    </div>
</div>
        )
    }
}

const mapStateToProps = state => ({
    totalPage: state.vcards.vcardTotalPage,
  })

export default connect(mapStateToProps, { postAPI, getVCards })(CreateVcard);