import React, { Component } from "react";
import setup from '../../actions/setup/api';
import fieldname from '../../actions/setup/FieldNameResource';
import { connect } from 'react-redux';
import { postAPI, getModels } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';
import { CommonSuccessMessage } from '../common/component';

class CreateModel extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            hasError: false,
            isValidForm: false,
            isSaved: false,
            errorMessage:'',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newName = {
            name: this.state.name
        }

        if (this.state.isValidForm) {
            this.props.postAPI(setup.BASE_URL + setup.Models, newName)
            .then(() => {
                this.props.getModels(this.props.totalPage);
                this.showSuccessMessage();
                this.setState({name: '', errorMessage: ''});
            })
            .catch(error => {
                this.setState({name: this.state.name, errorMessage: error.response.data.errorMessages});
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

  render() {
    return (
        <div className="col-lg-6">
        {this.state.errorMessage ? <p className="alert alert-danger">{this.state.errorMessage}</p>: null }
        <div className="panel panel-green">
            <div className="panel-heading">
                <p> Add New Model </p>
            </div>
            <div className="panel-body">
                <div className="row">
                { this.state.isSaved && CommonSuccessMessage('saved') }
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>{fieldname.FieldName.Model}</label>
                                <Textbox
                                    tabIndex="1" id={'name'} name="name"
                                    type="text" value={this.state.name} placeholder="Model Name"
                                    onChange={(name, e) => {
                                        if(name.length > 30 | !name) {
                                            this.setState({ name, hasError: true, isValidForm: false })
                                        }
                                        else {
                                            this.setState({ name, hasError: false, isValidForm: true  })
                                        }
                                    }} 
                                    onBlur={() => {}}
                                    validationOption={{
                                        name: 'Model Name',
                                        check: true, 
                                        required: true,
                                        max: '30',
                                    }} />
                            </div>
                            <input type="submit" value="Sumbit" className={this.state.name && !this.state.hasError ? 
                                'btn btn-success' : 'btn btn-success disabled'}/>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
    totalPage: state.models.modelTotalPage,
  })

export default connect(mapStateToProps, { postAPI, getModels })(CreateModel);