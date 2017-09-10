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
    this.deletePreset = this.deletePreset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.state.showDialog) {
      this.setState({ showDialog: nextProps.show });
    }
  }

  closeDialog() {
    this.setState({ showDialog: false });
    this.props.onClose(false);
  }

  deletePreset(e) {
    if (e.type === "click" ||
      (e.type === 'keypress' && e.key === 'Enter')) {
      this.props.onClose(true);
    }
  }

  render() {
    return (
      <Modal
        show={this.state.showDialog}
        onHide={this.closeDialog}
        onKeyPress={this.deletePreset}
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
          <Button className="dialog-footer-btn" bsStyle="primary" onClick={this.deletePreset}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CSSModules(AlertDialog, styles);
