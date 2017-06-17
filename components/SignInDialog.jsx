import React, { Component } from 'react';
import { Modal, Glyphicon, Button } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import styles from './styles/SignInDialog';

class SignInDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: false,
      signUp: false,
      isSignInPage: true,
      showSignInDialog: false,
    };
    this.renderBody = this.renderBody.bind(this);
    this.renderFooterBtn = this.renderFooterBtn.bind(this);
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

  renderFooterBtn() {
    if (this.state.isSignInPage) {
      return (
        <Button
          className="dialog-footer-btn"
          bsStyle="primary"
          onClick={() => this.setState({ signIn: true })}
        >
          Sign in
        </Button>
      );
    } else {
      return (
        <Button
          className="dialog-footer-btn"
          bsStyle="success"
          onClick={() => this.setState({ signUp: true })}
        >
          Sign up
        </Button>
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
            <Modal.Title>{ this.props.title }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.renderBody() }
          </Modal.Body>
          <Modal.Footer>
            { this.renderFooterBtn() }
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CSSModules(SignInDialog, styles, { allowMultiple: true });
