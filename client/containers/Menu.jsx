import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import InputRange from 'react-input-range';
import { Button, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';
import AlertDialog from '../components/AlertDialog';
import setSetting from '../actions/setSetting';
import deletePreset from '../actions/deletePreset';
import changeActivePreset from '../actions/changeActivePreset';
import { getActivePreset } from '../selectors/presetsSelectors';
import Preset from './Preset';
import SettingSection from './SettingSection';
import 'react-input-range/lib/css/index.css';
import styles from './styles/Menu';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSetting: '',
      showAlertDialog: false,
      alertMessage: '',
    };
    this.getActiveSettingValue = this.getActiveSettingValue.bind(this);
    this.renderInputRange = this.renderInputRange.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // If user saves the preset or closes the menu then automatically close all the settings
    if (!nextProps.openMenu) {
      if (this.state.activeSetting) {
        this.setState({ activeSetting: '' });
        this.props.onChangeSettings(false);
      }
    }
  }

  getActiveSettingValue() {
    return (_.filter(this.props.activePreset.data, { title: this.state.activeSetting })[0].value);
  }

  renderInputRange() {
    if (this.state.activeSetting) {
      return (
        <div styleName="input-range-wrapper">
          <InputRange
            maxValue={100}
            minValue={1}
            value={this.state.activeSetting ? this.getActiveSettingValue() : 1}
            onChange={value => this.props.setSetting({
              preset: this.props.activePreset.name,
              setting: this.state.activeSetting,
              value,
            })}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div styleName="menu-wrapper">
        <Preset onChangePreset={this.props.onChangePreset} />
        <SettingSection
          preset={this.props.activePreset.name}
          activeSetting={this.state.activeSetting}
          onClickSetting={title => {
            if (!title.length) {
              this.props.onChangeSettings(false);
            } else {
              this.props.onChangeSettings(true);
            }
            this.setState({ activeSetting: title });
          }}
        />
        { this.renderInputRange() }
        <div styleName="btns-wrapper">
          <Button
            styleName="savebtn-custom"
            bsStyle="primary"
            bsSize="large"
            onClick={() => {
              if (this.props.user) {
                this.setState({ activeSetting: '' });
              } else {
                this.setState({ activeSetting: '', showAlertDialog: true, alertMessage: 'Please sign in first!' });
              }
              this.props.onChangeSettings(false);
            }}
          >
            <Glyphicon glyph="floppy-disk" />
          </Button>
          <Button
            styleName="deletebtn-custom"
            bsStyle="danger"
            bsSize="large"
            onClick={() => {
              const presetName = this.props.activePreset.name;
              if (this.props.activePreset.name === 'Default') {
                this.setState({ activeSetting: '', showAlertDialog: true, alertMessage: 'Cannot delete default preset!' });
              } else {
                this.setState({ activeSetting: '', showAlertDialog: true, alertMessage: `Are you sure you want to delete preset "${presetName}"?`, isDeletePreset: true });
              }
              this.props.onChangeSettings(false);
            }}
          >
            <Glyphicon glyph="trash" />
          </Button>
        </div>
        <AlertDialog
          show={this.state.showAlertDialog}
          message={this.state.alertMessage}
          onClose={(pressOk) => {
            if (pressOk) {
              if (this.state.isDeletePreset) {
                this.setState({ activeSetting: '', showAlertDialog: false, isDeletePreset: false });
                this.props.changeActivePreset('Default');
                this.props.onChangePreset(true);
                this.props.deletePreset(this.props.activePreset.id);
              } else {
                this.setState({ activeSetting: '', showAlertDialog: false });
              }
            } else {
              this.setState({ showAlertDialog: false });
            }
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePreset: getActivePreset(state),
  };
}

export default connect(mapStateToProps, { setSetting, deletePreset, changeActivePreset })(CSSModules(Menu, styles));
