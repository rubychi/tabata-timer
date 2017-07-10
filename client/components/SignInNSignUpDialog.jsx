import React, { Component } from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import styles from './styles/SignInNSignUpDialog';

class SignInNSignUpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenW: 0,
      screenH: 0,
      isSignInPage: true,
    };
    this.renderBody = this.renderBody.bind(this);
    this.closeSignInDialog = this.closeSignInDialog.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ screenW: window.innerWidth, screenH: window.innerHeight });
  }

  closeSignInDialog() {
    this.setState({ signIn: false, signUp: false, isSignInPage: true, showSignInNSignUpDialog: false });
    this.props.onClose();
  }

  renderBody() {
    if (this.state.isSignInPage) {
      return (
        <SignIn
          isPhone={this.props.isPhone}
          screenW={this.state.screenW}
          screenH={this.state.screenH}
          signIn={this.state.signIn}
          history={this.props.history}
          onSignIn={this.props.onSignInOrSignUp}
          onClickSignUpHref={() => this.setState({ isSignInPage: false })}
        />
      );
    } else {
      return (
        <SignUp
          isPhone={this.props.isPhone}
          screenW={this.state.screenW}
          screenH={this.state.screenH}
          signUp={this.state.signUp}
          history={this.props.history}
          onSignUp={() => {
            this.setState({ isSignInPage: true });
            this.props.onSignInOrSignUp();
          }}
          onClickSignInHref={() => this.setState({ isSignInPage: true })}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Modal
          styleName="modal-custom"
          show={this.props.show}
          onHide={this.closeSignInDialog}
        >
          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph="time" /> { this.props.title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderBody() }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CSSModules(SignInNSignUpDialog, styles, { allowMultiple: true });
