import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { FormControl, HelpBlock } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { googleImg, fbImg } from '../global';
// import { setSetting } from '../actions/setSetting';
import SocialMediaBtn from '../components/SocialMediaBtn';
import signUp from '../actions/signUp';
import styles from './styles/SignInNSignUp';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      usernameValidationState: null,
      emailValidationState: null,
      pwdValidationState: null,
      pwdConfirmValidationState: null,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePwd = this.validatePwd.bind(this);
    this.validatePwdConfirm = this.validatePwdConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signUp) {
      this.validateEmail();
      this.validatePwd();
      this.validatePwdConfirm();
    }
  }

  validateEmail() {
    const value = this.emailInput.value;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.trim() || !pattern.test(value)) {
      this.setState({ emailValidationState: 'error' });
    } else {
      if (this.state.emailValidationState) {
        this.setState({ emailValidationState: null });
      }
    }
  }

  validatePwd() {
    const value = this.pwdInput.value;
    if (!value.trim() || value.trim().length < 8) {
      this.setState({ pwdValidationState: 'error' });
    } else {
      if (this.state.pwdValidationState) {
        this.setState({ pwdValidationState: null });
      }
    }
  }

  validatePwdConfirm() {
    const value1 = this.pwdInput.value;
    const value2 = this.pwdConfirmInput.value;
    if (value1 !== value2) {
      this.setState({ pwdConfirmValidationState: 'error' });
    } else {
      if (this.state.pwdConfirmValidationState) {
        this.setState({ pwdConfirmValidationState: null });
      }
    }
  }

  render() {
    return (
      <div styleName="wrapper">
        { /* TODO: can't resolve the correct path by simply put the image name, ex. google-icon-50x50 (file-loader isn't working?) */ }
        <SocialMediaBtn imgSrc={googleImg} bgColor="#DC4E41" text="Connect with Google" height="25px" onClick={() => this.props.history.push('/auth/google') } />
        <SocialMediaBtn imgSrc={fbImg} bgColor="#475993" text="Connect with Facebook" height="20px" onClick={() => this.props.history.push('/auth/facebook') } />
        <div styleName="line-breaks-wrapper">
          <hr /><span styleName="line-break-text">or</span><hr />
        </div>
        { this.state.errorMessage ? <div className="alert alert-danger"><strong>Oops!</strong> { this.state.errorMessage }</div> : null }
        <div styleName="input" className={this.state.emailValidationState ? `form-group has-${this.state.emailValidationState}` : 'form-group'}>
          <FormControl
            inputRef={(ref) => { this.emailInput = ref; }}
            style={{ marginTop: '10px' }}
            id="formControlsEmail"
            type="email"
            label="Email"
            placeholder="Email address"
            onBlur={this.validateEmail}
            onChange={() => {
              if (this.state.errorMessage || this.state.emailValidationState) {
                this.setState({
                  errorMessage: null,
                  emailValidationState: null,
                });
              }
            }}
          />
          { this.state.emailValidationState ? <HelpBlock className="show">The Email Address is in an invalid format</HelpBlock> : null }
        </div>
        <div styleName="input" className={this.state.pwdValidationState ? `form-group has-${this.state.pwdValidationState}` : 'form-group'}>
          <FormControl
            inputRef={(ref) => { this.pwdInput = ref; }}
            id="formControlsPassword"
            label="Password"
            type="password"
            placeholder="Password"
            onBlur={this.validatePwd}
            onChange={() => {
              if (this.state.errorMessage || this.state.pwdValidationState || this.pwdConfirmInput.value) {
                this.pwdConfirmInput.value = '';
                this.setState({
                  errorMessage: null,
                  pwdValidationState: null,
                  pwdConfirmValidationState: null,
                });
              }
            }}
          />
          { this.state.pwdValidationState ? <HelpBlock className="show">Password must be at least 8 characters</HelpBlock> : null }
        </div>
        <div styleName="input" className={this.state.pwdConfirmValidationState ? `form-group has-${this.state.pwdConfirmValidationState}` : 'form-group'}>
          <FormControl
            inputRef={(ref) => { this.pwdConfirmInput = ref; }}
            id="formControlsPasswordConfirm"
            label="PasswordConfirm"
            type="password"
            placeholder="Confirm password"
            onBlur={this.validatePwdConfirm}
            onChange={() => {
              if (this.state.errorMessage || this.state.pwdConfirmValidationState) {
                this.setState({
                  errorMessage: null,
                  pwdConfirmValidationState: null,
                });
              }
            }}
          />
          { this.state.pwdConfirmValidationState ? <HelpBlock className="show">Passwords don't match</HelpBlock> : null }
        </div>
        <span styleName="create-account-text">Already a member?
          <a
            styleName="signInNSignUp-href"
            onClick={this.props.onClickSignInHref}
            role="link"
          >
            {' '}Sign in
          </a>
        </span>
        <div
          className="modal-footer"
          styleName="signInNSignUp-footer"
        >
          <button
            type="button"
            className="dialog-footer-btn btn btn-success"
            styleName="signInNSignUp-btn"
            onClick={() => {
              this.validateEmail();
              this.validatePwd();
              this.validatePwdConfirm();
              const email = this.emailInput.value;
              const password = this.pwdInput.value;
              const passwordConfirm = this.pwdConfirmInput.value;
              if (email && password && passwordConfirm) {
                if (!this.state.emailValidationState && !this.state.pwdValidationState && !this.state.pwdConfirmValidationState) {
                  this.props.signUp({ email, password, presets: this.props.presets }, (errorMessage) => {
                    if (errorMessage) {
                      this.setState({ errorMessage });
                    } else {
                      this.props.onSignUp();
                    }
                  });
                }
              }
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ presets }) {
  return { presets };
}

export default connect(mapStateToProps, { signUp })(CSSModules(SignUp, styles, { allowMultiple: true }));
