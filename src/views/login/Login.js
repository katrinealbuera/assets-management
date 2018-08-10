import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postUser } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';
import setup from '../../js/setup/api';

class Login extends Component {

    constructor(props, context){
        super(props,context);

        this.state = {
            userName: '',
            password: '',
            errors: {},
            isLoading : false,
            isValidForm: false,
        }
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit =  (event) => {
        event.preventDefault();

        const userName = this.state.userName;
        const password = this.state.password

        this.setState({ errors: {}, isLoading: true});

        if (userName && password) {
           if (this.state.isValidForm) { 
               this.props.postUser(userName, password, this.RedirectToHome)
           }
        }
    }

    RedirectToHome = () => {
        this.context.router.history.push("/");
        window.location.reload(true);
    }

render() {
var loginForm = (
<form onSubmit={this.handleSubmit}>
    <fieldset>
        <p style={setup.requiredInput}>{this.props.error === 401 ? 'Invalid Credentials' : null}</p>
        <div className="form-group input-group">
            <span className="input-group-addon" role="img" aria-label="Email"><p className="fa fa-user"></p></span>
            <Textbox
                tabIndex="1" id={'userName'} name="userName"
                type="text" value={this.state.userName} placeholder="User Name"
                onChange={(userName, e) => {
                    if(!userName) {
                        this.setState({ userName, isValidForm: false })
                    }
                    else {
                        this.setState({ userName, isValidForm: true })
                    }
                }} 
                onBlur={() => {}}
                validationOption={{
                    name: 'User Name',
                    check: true, 
                    required: true 
                }} />
        </div>
        <div className="form-group input-group">
        <span className="input-group-addon" role="img" aria-label="Password"><p className="fa fa-key"></p></span>
        <Textbox
                tabIndex="1" id={'password'} name="password"
                type="password" value={this.state.password} placeholder="Password"
                onChange={(password, e) => {
                    if(!password) {
                        this.setState({ password, isValidForm: false })
                    }
                    else {
                        this.setState({ password, isValidForm: true })
                    }
                }} 
                onBlur={() => {}}
                validationOption={{
                    name: 'Password',
                    check: true, 
                    required: true 
                }} />
        </div>
        <input type="submit" 
            className={this.state.userName && this.state.password ? 'btn btn-info btn-lg btn-block' : 'btn btn-info btn-lg btn-block disabled'}
            value="Login"/><br/>
    </fieldset>
</form>
    );

    return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Please Sign In</h3>
                    </div>
                    <div className="panel-body">
						 { loginForm }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

Login.propTypes = {
    postUser: PropTypes.func.isRequired
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    error: state.error.error,
  })
  
export default connect(mapStateToProps, { postUser })(Login);