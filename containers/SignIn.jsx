import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';
import { FormControl, HelpBlock } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import { googleImg, fbImg } from '../global';
// import { setSetting } from '../actions/setSetting';
import SocialMediaBtn from '../components/SocialMediaBtn';
import styles from './styles/SignInNSignUp';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationState: null,
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
        { /* TODO: can't resolve the correct path by simply put the image name, ex. google-icon-50x50 (file-loder isn't working?) */ }
        <SocialMediaBtn imgSrc={googleImg} bgColor="#DC4E41" text="Sign in with Google" height="25px" />
        <SocialMediaBtn imgSrc={fbImg} bgColor="#475993" text="Sign in with Facebook" height="20px" />
        <div styleName="line-breaks-wrapper">
          <hr /><span styleName="line-break-text">or</span><hr />
        </div>
        <HelpBlock className={this.state.validationState ? 'show hint-error' : 'hidden'}>Incorrect email or password</HelpBlock>
        <div styleName="input" className={this.state.validationState ? `form-group has-${this.state.validationState}` : 'form-group'}>
          <FormControl
            id="formControlsEmail"
            type="email"
            label="Email"
            placeholder="Email address"
          />
          <FormControl
            style={{ marginTop: '10px' }}
            id="formControlsPassword"
            label="Password"
            type="password"
            placeholder="Password"
          />
        </div>
        <span styleName="create-account-text">Don&apos;t have an account?
          <a styleName="signInNSignUp-href" onClick={this.props.onClickSignUp} role="link"> Sign up</a>
        </span>
      </div>
    );
  }
}

export default CSSModules(SignIn, styles, { allowMultiple: true });
