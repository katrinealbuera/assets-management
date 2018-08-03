import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postUser } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';

const requiredInput = {
    color: 'red'
}

class Login extends Component {

    constructor(props, context){
        super(props,context);

        this.state = {
            userName: '',
            password: '',
            errors: {},
            isLoading : false
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
           this.props.postUser(userName, password, this.RedirectToHome)
        }
    }

    RedirectToHome = () => {
        this.context.router.history.push("/home");
        window.location.reload(true);
    }

render() {

    console.log(this.props.error)

var loginForm = (
<form onSubmit={this.handleSubmit}>
    <fieldset>
        <p style={requiredInput}>{this.props.error === 401 ? 'Invalid Credentials' : null}</p>
        <div className="form-group input-group">
            <span className="input-group-addon" role="img" aria-label="Email">@</span>
            <Textbox
                tabIndex="1" id={'name'} name="userName"
                type="text" value={this.state.userName} placeholder="User Name"
                onChange={(userName, e) => {
                    this.setState({ userName })
                }} 
                onBlur={() => {}}
                validationOption={{
                    name: 'User Name',
                    check: true, 
                    required: true 
                }} />
        </div>
        <div className="form-group input-group">
        <span className="input-group-addon" role="img" aria-label="Password">🔑</span>
        <Textbox
                tabIndex="1" id={'name'} name="userName"
                type="password" value={this.state.password} placeholder="Password"
                onChange={(password, e) => {
                    this.setState({ password })
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
            value="Login"/>
    </fieldset>
</form>
    );

    return (
<div id="page-wrapper">
    <div className="row">
        <div className="col-md-6 col-lg-6 col-md-offset-3">
            <div className="login-panel panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Login</h3>
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