import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
// import TapAndPinchable from 'react-tappable';
import CSSModules from 'react-css-modules';
import { setSetting } from '../actions/setSetting';
import styles from './styles/Setting';

class Setting extends Component {
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
          <Button
            styleName="btn-plus"
            bsSize="large"
            onClick={(e) => {
              e.stopPropagation();
              this.props.setSetting({
                preset: this.props.preset,
                setting: this.props.title,
                value: this.props.value < 100 ? this.props.value + 1 : 100,
              })}
            }
          >
            <Glyphicon glyph="plus" />
          </Button>
          <Button
            styleName="btn-minus"
            bsSize="large"
            onClick={(e) => {
              e.stopPropagation();
              this.props.setSetting({
                preset: this.props.preset,
                setting: this.props.title,
                value: this.props.value > 1 ? this.props.value - 1 : 1,
              })}
            }
          >
            <Glyphicon glyph="minus" />
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { setSetting })(CSSModules(Setting, styles, { allowMultiple: true }));
