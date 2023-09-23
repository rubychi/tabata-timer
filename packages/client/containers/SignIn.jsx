import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { googleImg } from '../global';
import SocialMediaBtn from '../components/SocialMediaBtn';
import { ROOT_URL } from '../actions';
import signIn from '../actions/signIn';
import styles from './styles/SignInNSignUp';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };
    this.popup = this.popup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signIn) {
      this.setState({ validationState: 'error' });
    }
  }

  popup(path) {
    if (this.props.isPhone) {
      window.open(`${ROOT_URL}${path}`, '_blank', `width=${this.props.screenW}, height=${this.props.screenH}`);
    } else {
      window.open(`${ROOT_URL}${path}`, '_blank', `width=${this.props.screenW / 2}, height=${this.props.screenH}, left=${this.props.screenW / 4}`);
    }
  }

  render() {
    return (
      <div styleName="wrapper">
        { /* TODO: can't resolve the correct path by simply put the image name, ex. google-icon-50x50 (file-loader isn't working?) */ }
        <SocialMediaBtn imgSrc={googleImg} bgColor="#DC4E41" text="Sign in with Google" height="25px" onClick={() => this.popup('/auth/google')} />
        {/* <SocialMediaBtn imgSrc={fbImg} bgColor="#475993" text="Sign in with Facebook" height="20px" onClick={() => this.popup('/auth/facebook')} /> */}
        <div styleName="line-breaks-wrapper">
          <hr /><span styleName="line-break-text">or</span><hr />
        </div>
        { this.state.errorMessage ? <div className="alert alert-danger"><strong>Oops!</strong> Incorrect email or password</div> : null }
        <div styleName="input" className={this.state.validationState ? `form-group has-${this.state.validationState}` : 'form-group'}>
          <FormControl
            inputRef={(ref) => { this.emailInput = ref; }}
            style={{ marginTop: '10px' }}
            id="formControlsEmail"
            type="email"
            label="Email"
            placeholder="Email address"
            onChange={() => {
              if (this.state.errorMessage) {
                this.setState({ errorMessage: null });
              }
            }}
          />
          <FormControl
            inputRef={(ref) => { this.pwdInput = ref; }}
            style={{ marginTop: '10px' }}
            id="formControlsPassword"
            label="Password"
            type="password"
            placeholder="Password"
            onChange={() => {
              if (this.state.errorMessage) {
                this.setState({ errorMessage: null });
              }
            }}
          />
        </div>
        <span styleName="create-account-text">Don&apos;t have an account?
          <a
            styleName="signInNSignUp-href"
            onClick={this.props.onClickSignUpHref}
            role="link"
          >
            {' '}Sign up
          </a>
        </span>
        <div
          className="modal-footer"
          styleName="signInNSignUp-footer"
        >
          <button
            type="button"
            className="dialog-footer-btn btn btn-primary"
            styleName="signInNSignUp-btn"
            onClick={() => {
              const email = this.emailInput.value;
              const password = this.pwdInput.value;
              this.props.signIn({ email, password }, (errorMessage) => {
                if (errorMessage) {
                  this.setState({ errorMessage });
                } else {
                  this.props.onSignIn();
                }
              });
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { signIn })(CSSModules(SignIn, styles, { allowMultiple: true }));
