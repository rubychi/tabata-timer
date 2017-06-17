import React, { Component } from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './styles/AlertDialog';

class AlertDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
    };
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showDialog) {
      this.setState({ showDialog: nextProps.show });
    }
  }

  closeDialog(pressOk) {
    pressOk = pressOk === true ? true : false;
    this.setState({ showDialog: false });
    this.props.onClose(pressOk);
  }

  render() {
    return (
      <Modal
        show={this.state.showDialog}
        onHide={this.closeDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="warning">
            { this.props.message }
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button className="dialog-footer-btn" bsStyle="primary" onClick={() => this.closeDialog(true)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CSSModules(AlertDialog, styles);
