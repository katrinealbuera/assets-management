import React, { Component } from 'react';
import { Textbox } from 'react-inputs-validation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postAPI, getUsers, clearError } from '../../../actions/assetAction';
import setup from '../../setup/api';

class CreateUser extends Component {
    
    constructor(props, context){
        super(props,context);

        this.state = {
            fullName:'',
            userName: '',
            password: '',
            errors:'',
            isLoading : false,
            usernameError: false,
            fullnameError: false,
            passwordError: false,
            isValidForm: '',
        }
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
            .then((response) => {
             this.props.getUsers();
             })
             .catch(error => console.log(error));

            this.setState({fullName: '', userName: '', password: ''});
         }
        }
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
        
                <input type="submit" 
                className={this.state.userName && this.state.fullName && this.state.password && this.state.isValidForm ?
                     'btn btn-success btn-lg btn-block' : 'btn btn-success btn-lg btn-block disabled'}
                value="Register"/>
            </fieldset>
        </form>
            )

    return (
        <div className="col-lg-6">
        <div className="panel panel-success">
            <div className="panel-heading">
                <p> Add New User </p>
            </div>
            <div className="panel-body">
                <div className="row">
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
  })

  CreateUser.contextTypes = {
    router: PropTypes.object.isRequired
} 

export default connect(mapStateToProps, {postAPI, getUsers, clearError})(CreateUser);