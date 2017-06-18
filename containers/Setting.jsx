import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import TapAndPinchable from 'react-tappable';
import CSSModules from 'react-css-modules';
import { setSetting } from '../actions/setSetting';
import styles from './styles/Setting';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: null,
      pressPlusBtn: props.pressPlusBtn,
      pressMinusBtn: props.pressMinusBtn,
    };
    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    const timerId = setInterval(this.tick, 100);
    this.setState({ timerId });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  tick() {
    if (this.props.open) {console.log(this.state);
      if (this.state.pressPlusBtn) {
        this.props.setSetting({
          preset: this.props.preset,
          setting: this.props.title,
          value: this.props.value < 100 ? this.props.value + 1 : 100,
        });
      }
      if (this.state.pressMinusBtn) {
        this.props.setSetting({
          preset: this.props.preset,
          setting: this.props.title,
          value: this.props.value > 1 ? this.props.value - 1 : 1,
        })
      }
    }
  }

  render() {
    return (
      <div
        styleName={this.props.open ? "panel-wrapper panel-wrapper-engraved" : "panel-wrapper"}
        onClick={() => this.props.onClickSetting(this.props.title)}
      >
        <Panel header={this.props.title} styleName="panel-custom" bsClass="panel" bsStyle="info">
          {this.props.value}
        </Panel>
        <div styleName={this.props.open ? "btns-wrapper" : "hidden"}>
          {/* TODO: there is no listener for detecting the end of press event! */}
          <TapAndPinchable
            styleName="btn-plus"
            className="btn btn-lg btn-default"
            onTap={() => {
              this.props.setSetting({
                preset: this.props.preset,
                setting: this.props.title,
                value: this.props.value < 100 ? this.props.value + 1 : 100,
              })
            }}
            onPress={() => this.props.onPressPlusBtn()}
          >
            <Glyphicon glyph="plus" />
          </TapAndPinchable>
          {/* TODO: there is no listener for detecting the end of press event! */}
          <TapAndPinchable
            styleName="btn-minus"
            className="btn btn-lg btn-default"
            onTap={() => {
              this.props.setSetting({
                preset: this.props.preset,
                setting: this.props.title,
                value: this.props.value > 1 ? this.props.value - 1 : 1,
              })
            }}
            onPress={() => this.props.onPressMinusBtn()}
          >
            <Glyphicon glyph="minus" />
          </TapAndPinchable>
        </div>
      </div>
    );
  }
}

export default connect(null, { setSetting })(CSSModules(Setting, styles, { allowMultiple: true }));
