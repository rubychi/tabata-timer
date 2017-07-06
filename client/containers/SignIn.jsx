import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { FormControl, HelpBlock } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { googleImg, fbImg } from '../global';
// import { setSetting } from '../actions/setSetting';
import SocialMediaBtn from '../components/SocialMediaBtn';
import signIn from '../actions/signIn';
import styles from './styles/SignInNSignUp';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signIn) {
      this.setState({ validationState: 'error' });
    }
  }

  render() {
    return (
      <div styleName="wrapper">
        { /* TODO: can't resolve the correct path by simply put the image name, ex. google-icon-50x50 (file-loader isn't working?) */ }
        <SocialMediaBtn imgSrc={googleImg} bgColor="#DC4E41" text="Sign in with Google" height="25px" />
        <SocialMediaBtn imgSrc={fbImg} bgColor="#475993" text="Sign in with Facebook" height="20px" />
        <div styleName="line-breaks-wrapper">
          <hr /><span styleName="line-break-text">or</span><hr />
        </div>
        { this.state.errorMessage ? <HelpBlock className="show hint-erro" style={{ color: '#a94442' }}>Incorrect email or password</HelpBlock> : null }
        <div styleName="input" className={this.state.validationState ? `form-group has-${this.state.validationState}` : 'form-group'}>
          <FormControl
            inputRef={(ref) => { this.emailInput = ref; }}
            id="formControlsEmail"
            type="email"
            label="Email"
            placeholder="Email address"
          />
          <FormControl
            inputRef={(ref) => { this.pwdInput = ref; }}
            style={{ marginTop: '10px' }}
            id="formControlsPassword"
            label="Password"
            type="password"
            placeholder="Password"
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
