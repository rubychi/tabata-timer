import React, { Component } from 'react';
import { Panel, ProgressBar } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import moment from 'moment';
import styles from './styles/Timer';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer1: props.timer1,
      timer2: props.timer2,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startRound) {
      this.setState({
        timer1: this.props.timer1,
        timer2: this.props.timer2,
      });
    }
    if (this.props.progress1 > nextProps.progress1) {
      this.setState({ timer1: this.state.timer1 - 1 });
    }
    if (this.props.progress2 > nextProps.progress2) {
      this.setState({ timer2: this.state.timer2 - 1 });
    }
  }

  render() {
    const {title, progress1, progress2, p1Style, p2Style, p1Active, p2Active} = this.props;

    let progressBars = [];
    if (p1Active) {
      progressBars.push(
        <div key={uuidV4()}>
          <div styleName="timer-text">
            {moment.utc(this.state.timer1 * 1000).format('mm:ss')}
          </div>
          <ProgressBar
            bsStyle={p1Style}
            now={progress1}
            active
          />
        </div>
      );
    } else {
      progressBars.push(
        <div key={uuidV4()}>
          <div styleName="timer-text">
            {moment.utc(this.state.timer1 * 1000).format('mm:ss')}
          </div>
          <ProgressBar
            bsStyle={p1Style}
            now={progress1}
          />
        </div>
      );
    }
    if (progress2 !== null) {
      if (p2Active) {
        progressBars.push(
          <div key={uuidV4()}>
            <div styleName="timer-text">
              {moment.utc(this.state.timer2 * 1000).format('mm:ss')}
            </div>
            <ProgressBar
              bsStyle={p2Style}
              now={progress2}
              active
            />
          </div>
        );
      } else {
        progressBars.push(
          <div key={uuidV4()}>
            <div styleName="timer-text">
              {moment.utc(this.state.timer2 * 1000).format('mm:ss')}
            </div>
            <ProgressBar
              bsStyle={p2Style}
              now={progress2}
            />
          </div>
        );
      }
    }
    return (
      <Panel
        styleName="panel-custom"
        header={title}
        eventKey="1"
        onClick={() => this.props.onModifyName(this.props.id, title)}
      >
        {progressBars}
      </Panel>
    );
  }
}

export default CSSModules(Timer, styles);
