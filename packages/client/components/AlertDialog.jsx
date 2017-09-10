import React, { Component } from 'react';
import { Modal, Glyphicon, Alert, Button } from 'react-bootstrap';
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

  closeDialog(e, pressOk) {
    pressOk = pressOk || false;
    if (e && e.type === 'keypress' && e.key === 'Enter') {
      pressOk = true;
    }
    if (pressOk) {
      this.props.onClose(pressOk);
    }
    this.setState({ showDialog: false });
  }

  render() {
    return (
      <Modal
        show={this.state.showDialog}
        onHide={this.closeDialog}
        onKeyPress={this.closeDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title><Glyphicon glyph="exclamation-sign" /> Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="warning">
            { this.props.message }
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button className="dialog-footer-btn" bsStyle="primary" onClick={(e) => this.closeDialog(e, true)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CSSModules(AlertDialog, styles);
