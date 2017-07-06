import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import { getActivePreset } from '../selectors/presetsSelectors';
import Setting from '../containers/Setting';
import styles from './styles/SettingSection';

class SettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressPlusBtn: false,
      pressMinusBtn: false,
    };
  }

  componentWillMount() {
    let settingsOpen = {};
    this.props.data.map(item => {
      settingsOpen[item.title] = false;
    });
    this.setState(settingsOpen);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // If user saves the preset or closes the menu then automatically close all the settings
    if (!nextProps.activeSetting) {
      let newState = {};
      newState = _.mapValues(this.state, () => false);
      this.setState(newState);
    }
  }

  toggleSettings(title) {
    let newState = {};
    if (this.state[title]) {
      newState[title] = false;
      this.props.onClickSetting('');
    } else {
      newState = _.mapValues(this.state, () => false);
      newState[title] = true;
      this.props.onClickSetting(title);
    }
    this.setState(newState);
  }

  render() {
    return (
      <div styleName="setting-wrapper">
        {this.props.data.map(item => (
          <Setting
            key={uuidV4()}
            preset={this.props.preset}
            title={item.title}
            value={item.value}
            open={this.state[item.title]}
            pressPlusBtn={this.state.pressPlusBtn}
            pressMinusBtn={this.state.pressMinusBtn}
            onClickSetting={this.toggleSettings}
            onPressPlusBtn={() => this.setState({ pressPlusBtn: true, pressMinusBtn: false })}
            onPressMinusBtn={() => this.setState({ pressMinusBtn: true, pressPlusBtn: false })}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: getActivePreset(state).data,
  };
}

export default connect(mapStateToProps)(CSSModules(SettingSection, styles));
