import React, { Component } from 'react';
import { Modal, Glyphicon } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import styles from './styles/SignInDialog';

class SignInDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignInPage: true,
      showSignInDialog: false,
    };
    this.renderBody = this.renderBody.bind(this);
    this.closeSignInDialog = this.closeSignInDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showSignInDialog) {
      this.setState({ showSignInDialog: nextProps.show });
    }
  }

  closeSignInDialog() {
    this.setState({ signIn: false, signUp: false, isSignInPage: true, showSignInDialog: false });
    this.props.onClose();
  }

  renderBody() {
    if (this.state.isSignInPage) {
      return (
        <SignIn
          signIn={this.state.signIn}
          showSignInDialog={this.state.showSignInDialog}
          onClickSignUp={() => this.setState({ isSignInPage: false })}
        />
      );
    } else {
      return (
        <SignUp
          signUp={this.state.signUp}
          onClickSignIn={() => this.setState({ isSignInPage: true })}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <Modal
          styleName="modal-custom"
          show={this.state.showSignInDialog}
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

export default CSSModules(SignInDialog, styles, { allowMultiple: true });
