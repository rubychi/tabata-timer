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
      isSignInPage: true,
      showSignInNSignUpDialog: false,
    };
    this.renderBody = this.renderBody.bind(this);
    this.closeSignInDialog = this.closeSignInDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showSignInNSignUpDialog) {
      this.setState({ showSignInNSignUpDialog: nextProps.show });
    }
  }

  closeSignInDialog() {
    this.setState({ signIn: false, signUp: false, isSignInPage: true, showSignInNSignUpDialog: false });
    this.props.onClose();
  }

  renderBody() {
    if (this.state.isSignInPage) {
      return (
        <SignIn
          signIn={this.state.signIn}
          onSignIn={() => {
            this.setState({ showSignInNSignUpDialog: false });
            this.props.onSignInOrSignUp();
          }}
          showSignInNSignUpDialog={this.state.showSignInNSignUpDialog}
          onClickSignUpHref={() => this.setState({ isSignInPage: false })}
        />
      );
    } else {
      return (
        <SignUp
          signUp={this.state.signUp}
          onSignUp={() => {
            this.setState({
              isSignInPage: true,
              showSignInNSignUpDialog: false
            });
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
          show={this.state.showSignInNSignUpDialog}
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
