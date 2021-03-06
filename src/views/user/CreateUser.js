import React, { Component } from 'react';
import { Textbox } from 'react-inputs-validation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postAPI, getUsers, clearError } from '../../actions/assetAction';
import { CommonResetBtn, CommonSuccessMessage } from '../common/component';
import setup from '../../actions/setup/api';

class CreateUser extends Component {
    
    constructor(props, context){
        super(props,context);

        this.state = {
            isLoading : false,
            usernameError: false,
            fullnameError: false,
            passwordError: false,
            isSaved: false,
            fullName:'',
            userName: '',
            password: '',
            errors:'',
            isValidForm: '',
            errorMessage:'',
        }
    }

    resetForm = () => {
        this.setState({fullName: '', userName: '', password: ''});
    }

    componentWillMount() {
        this.props.clearError()
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }
    
    handleSubmit =  (event) => {
        event.preventDefault();

        let addUser = {
            userName: this.state.userName,
            password: this.state.password,
            fullName: this.state.fullName,
        }
        
        if (this.state.isValidForm) {
            if (addUser.userName && addUser.fullName && addUser.password) {
            this.props.postAPI(setup.BASE_URL + setup.GetUser, addUser)
            .then(() => {
             this.props.getUsers(this.props.totalPage);
             this.showSuccessMessage();
             this.setState({fullName: '', userName: '', password: '', errorMessage: ''});
            })
            .catch(error => {
                this.setState({password: '', errorMessage: error.response.data.errorMessages});
            })
         }
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
    var registerForm = (
        <form onSubmit={this.handleSubmit}>
            <fieldset>
                {this.props.error ? <p className="alert alert-danger">{this.props.error.errorMessages}</p>: null }
                <div className="form-group input-group">
                    <span className="input-group-addon" role="img" aria-label="Name">Full Name<span style={setup.requiredInput}> *</span></span>
                    <Textbox
                        tabIndex="1" id={'fullName'} name="fullName"
                        type="text" value={this.state.fullName} placeholder="Name"
                        onChange={(fullName, e) => {
                            if (fullName.length > 60 || !fullName){
                                this.setState({fullName, fullnameError: true, isValidForm: false })
                             }
                             else{
                                this.setState({ fullName, fullnameError: false , isValidForm: true })
                             }
                        }} 
                        onBlur={() => {}}
                        validationOption={{
                            name: 'Name',
                            check: true, 
                            required: true,
                        }} />
                </div>
                <div className="form-group input-group">
                    <span className="input-group-addon" role="img" aria-label="UserName">Username<span style={setup.requiredInput}> *</span></span>
                    <Textbox
                        tabIndex="1" id={'userName'} name="userName"
                        type="text" value={this.state.userName} placeholder="User Name"
                        onChange={(userName, e) => {
                             if (userName.length > 20 || !userName){
                                this.setState({userName, usernameError: true, isValidForm: false  })
                             }
                             else{
                                this.setState({ userName, usernameError: false, isValidForm: true })
                             }
                        }} 
                        onBlur={() => {}}
                        validationOption={{
                            name: 'User Name',
                            check: true, 
                            required: true,
                        }} />
                </div>
                <div className="form-group input-group">
                <span className="input-group-addon" role="img" aria-label="Password">Password<span style={setup.requiredInput}> *</span></span>
                <Textbox
                        tabIndex="1" id={'password'} name="password"
                        type="password" value={this.state.password} placeholder="Password"
                        onChange={(password, e) => {
                            if (password){
                                this.setState({ password, passwordError: false, isValidForm: true })
                             }
                             else{
                                 this.setState({password, passwordError: true , isValidForm: false })
                             }
                        }} onBlur={() => {}}
                        validationOption={{
                            name: 'Password',
                            check: true, 
                            required: true,
                        }}  />
                </div>

                <div className="form-group input-group">
                    <input type="submit" style={setup.styleCloseBtn} 
                    className={this.state.userName && this.state.fullName && this.state.password && this.state.isValidForm ?
                     'btn btn-success' : 'btn btn-success disabled'}
                        value="Register"/>

                    {CommonResetBtn(this.resetForm)}
                </div>
            </fieldset>
        </form>
            )

    return (
        <div className="col-lg-6">
         {this.state.errorMessage ? <p className="alert alert-danger">{this.state.errorMessage}</p>: null }
        <div className="panel panel-green">
            <div className="panel-heading">
                <p> Add New User </p>
            </div>
            <div className="panel-body">
                <div className="row">
                { this.state.isSaved && CommonSuccessMessage('saved') }
                    <div className="col-lg-12">
                        {registerForm}    
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    error: state.error.error,
    currentPage: state.users.userCurrentPage,
  })

  CreateUser.contextTypes = {
    router: PropTypes.object.isRequired
} 

export default connect(mapStateToProps, {postAPI, getUsers, clearError})(CreateUser);