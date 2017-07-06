import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { DropdownButton, MenuItem, Glyphicon, Modal, FormControl, HelpBlock, Button } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import { getActivePreset, getPresetsName } from '../selectors/presetsSelectors';
import addPreset from '../actions/addPreset';
import changeActivePreset from '../actions/changeActivePreset';
import styles from './styles/Preset';

class Preset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presetValidationState: null,
    };
    this.addPreset = this.addPreset.bind(this);
    this.closeAddPresetDialog = this.closeAddPresetDialog.bind(this);
    this.renderMenuItems = this.renderMenuItems.bind(this);
  }

  addPreset() {
    const value = this.addPresetInput.value;
    if (!value.trim() || _.find(this.props.presetsName, (preset) => preset === value) !== undefined) {
      this.setState({ presetValidationState: 'error' });
    } else {
      this.props.addPreset(value);
      this.props.changeActivePreset(value);
      this.props.onChangePreset(true);
      this.setState({ presetValidationState: null, showAddPresetDialog: false });
    }
  }

  closeAddPresetDialog() {
    this.setState({ presetValidationState: null, showAddPresetDialog: false });
  }

  renderMenuItems() {
    const menuItems = this.props.presetsName.map((name, idx) => {
      if (name === this.props.activePreset) {
        return <MenuItem key={uuidV4()} eventKey={idx + 1} active>{ name }</MenuItem>
      }
      return (
        <MenuItem
          key={uuidV4()}
          eventKey={idx + 1}
          onClick={() => {
            this.props.changeActivePreset(name);
            this.props.onChangePreset(true);
          }}
        >
          { name }
        </MenuItem>
      );
    });
    menuItems.push(<MenuItem key={uuidV4()} divider />);
    menuItems.push(
      <MenuItem
        key={uuidV4()}
        eventKey="0"
        onClick={() => this.setState({ showAddPresetDialog: true })}
      >
        <Glyphicon glyph="plus" /> Add preset
      </MenuItem>
    );
    return menuItems;
  }

  render() {
    return (
      <div>
        <DropdownButton id={uuidV4()} styleName="dropdownbtn-custom" bsStyle="default" bsSize="large" title={`Preset: ${this.props.activePreset}`}>
          { this.renderMenuItems() }
        </DropdownButton>
        <Modal
          show={this.state.showAddPresetDialog}
          onEntered={() => this.addPresetInput.focus()}
          onHide={this.closeAddPresetDialog}
        >
          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph="plus-sign" /> Add preset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={this.state.presetValidationState ? `form-group has-${this.state.presetValidationState}` : 'form-group'}>
              <FormControl
                inputRef={(ref) => { this.addPresetInput = ref; }}
                type="text"
                placeholder="Enter name"
                onChange={() => {
                  if (this.state.presetValidationState) {
                    this.setState({ presetValidationState: null });
                  }
                }}
              />
              { this.state.presetValidationState ? <HelpBlock className="show hint-error">Type name is empty or already exists</HelpBlock> : null }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="dialog-footer-btn" bsStyle="primary" onClick={this.addPreset}>Ok</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePreset: getActivePreset(state).name,
    presetsName: getPresetsName(state),
  };
}

export default connect(mapStateToProps, { addPreset, changeActivePreset })(CSSModules(Preset, styles));
