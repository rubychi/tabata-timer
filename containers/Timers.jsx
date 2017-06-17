import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import Sound from 'react-sound';
import { Modal, FormControl, Button } from 'react-bootstrap';
import { getActivePreset } from '../selectors/presetsSelectors';
import { setTitles } from '../actions/setTitles';
import Timer from '../components/Timer';
import styles from './styles/Timers';

class Timers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: null,
      kickStart: false,
      playSound: false,
      showModifyTitleDialog: false,
      titleValidationState: null,
    };
    this.tick = this.tick.bind(this);
    this.initState = this.initState.bind(this);
    this.renderTimers = this.renderTimers.bind(this);
    this.modifyName = this.modifyName.bind(this);
    this.saveModifiedName = this.saveModifiedName.bind(this);
    this.closeModifyTitleDialog = this.closeModifyTitleDialog.bind(this);
  }

  componentWillMount() {
    this.initState(this.props.activePreset);
    const timerId = setInterval(this.tick, 1000);
    this.setState({ timerId });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset || nextProps.changePreset || nextProps.changeSetting) {
      this.initState(nextProps.activePreset);
    }

    if (nextProps.startTimer) {
      if (!this.state.kickStart) {
        this.setState({ kickStart: true, playSound: true });
        setTimeout(() => this.setState({ playSound: false }));
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  modifyName(id, modifyName) {
    this.setState({ showModifyTitleDialog: true, modifyId: id, modifyName });
  }

  saveModifiedName() {
    if (!this.modifyNameInput.value.trim()) {
      this.setState({ titleValidationState: 'error' });
    } else {
      let newCycles = _.cloneDeep(this.state.cycles);
      const idx = _.findIndex(newCycles, { id: this.state.modifyId });
      newCycles[idx].title = this.modifyNameInput.value;
      this.props.setTitles({
        id: this.props.activePreset.id,
        titles: _.sortBy(newCycles, 'origIdx').map((item) => { return(item.title); })
      });
      this.setState({
        cycles: newCycles,
        titleValidationState: null,
        showModifyTitleDialog: false,
      });
    }
  }

  closeModifyTitleDialog() {
    this.setState({ titleValidationState: null, showModifyTitleDialog: false });
  }

  tick() {
    if (this.props.startTimer) {
      if (this.state.curTabatas <= this.state.tabatas) {
        let newState = _.cloneDeep(this.state);
        let curCycle = newState.cycles[0];
        let finCycleFlag = false;
        if (curCycle.prepareActive !== undefined) {
          if (!curCycle.prepareActive) {
            curCycle.prepareActive = true;
            newState.curTabatas += 1;
            if (newState.curTabatas <= this.state.tabatas) {
              // The previous round has been finished
              if (!curCycle.prepare) {
                curCycle.prepare = 100;
                const restCycles = newState.cycles.slice(1).map((item) => {
                  item.work = 100;
                  item.rest = 100;
                  return item;
                });
                newState.cycles = [curCycle, ...restCycles];
              }
              this.props.onStartCycle(`T${newState.curTabatas}: ${newState.cycles[0].title}`);
            }
          } else {
            if (curCycle.prepare) {
              curCycle.prepare -= (100 / this.state.prepare);
              if (curCycle.prepare < 0) {
                curCycle.prepare = 0;
              }
            } else {
              curCycle.prepareActive = false;
              if (newState.curTabatas <= this.state.tabatas) {
                finCycleFlag = true;
              }
            }
          }
        } else {
          if (!curCycle.workActive && !curCycle.restActive) {
            curCycle.workActive = true;
            this.props.onStartCycle(`T${newState.curTabatas}: ${newState.cycles[0].title}`);
          } else if (curCycle.workActive) {
            if (curCycle.work) {
              curCycle.work -= (100 / this.state.work);
              if (curCycle.work < 0) {
                curCycle.work = 0;
              }
            } else {
              curCycle.workActive = false;
              curCycle.restActive = true;
              newState.playSound = true;
            }
          } else if (curCycle.restActive) {
            if (curCycle.rest) {
              curCycle.rest -= (100 / this.state.rest);
              if (curCycle.rest < 0) {
                curCycle.rest = 0;
              }
            } else {
              curCycle.restActive = false;
              finCycleFlag = true;
            }
          }
        }
        newState.cycles[0] = curCycle;
        if (finCycleFlag) {
          let shifted = newState.cycles.shift();
          newState.cycles.push(shifted);
          newState.playSound = true;
        }
        this.setState(newState);
      } else {
        this.initState(this.props.activePreset);
        this.props.onStartCycle('Finished');
      }
    }
  }

  initState(state) {
    // Convert preset settings from array to object
    let presetSettings = _.merge(...state.data.map(item => {
      let res = {}
      res[item.title.toLowerCase()] = item.value;
      return res;
    }));
    this.setState({
      tabatas: presetSettings.tabatas,
      prepare: presetSettings.prepare,
      work: presetSettings.work,
      rest: presetSettings.rest,
      curTabatas: 0,
      cycles: [{
        id: uuidV4(),
        origIdx: 0,
        title: state.userDefinedTitles ? state.userDefinedTitles[0] || 'Prepare' : 'Prepare',
        prepare: 100,
        prepareActive: false,
      }, ..._.times(presetSettings.cycles, function(n) {
        return {
          id: uuidV4(),
          origIdx: n + 1,
          title: state.userDefinedTitles ? state.userDefinedTitles[n + 1] || `Cycle ${n + 1}` : `Cycle ${n + 1}`,
          work: 100,
          workActive: false,
          rest: 100,
          restActive: false,
        };
      })],
    });
  }

  renderTimers() {
    let timers = [];
    timers.push(this.state.cycles.map((timer) => {
      const { id, title, prepare, prepareActive, work, workActive, rest, restActive } = timer;
      if (prepare !== undefined) {
        return (
          <Timer
            key={id}
            id={id}
            title={title}
            progress1={prepare}
            p1Style="success"
            p1Active={prepareActive}
            progress2={null}
            onModifyName={this.modifyName}
          />
        );
      } else {
        return (
          <Timer
            key={id}
            id={id}
            title={title}
            progress1={work}
            p1Style="danger"
            p1Active={workActive}
            progress2={rest}
            p2Style="warning"
            p2Active={restActive}
            onModifyName={this.modifyName}
          />
        );
      }
    }));
    return timers;
  }

  render() {
    return (
      <div styleName="timers-wrapper">
        {this.renderTimers()}
        <Sound
          url="https://www.soundjay.com/button/sounds/beep-02.mp3"
          playStatus={this.state.playSound ? Sound.status.PLAYING : Sound.status.PAUSED}
          onFinishedPlaying={() => this.setState({ playSound: false })}
        />
        <Modal
          show={this.state.showModifyTitleDialog}
          onEntered={() => this.modifyNameInput.focus()}
          onHide={this.closeModifyTitleDialog}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modify name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={this.state.titleValidationState ? `form-group has-${this.state.titleValidationState}` : 'form-group'}>
              <FormControl
                inputRef={(ref) => { this.modifyNameInput = ref; }}
                type="text"
                placeholder={this.state.modifyName}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="dialog-footer-btn" bsStyle="primary" onClick={this.saveModifiedName}>Ok</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activePreset: getActivePreset(state),
  };
}

export default connect(mapStateToProps, { setTitles })(CSSModules(Timers, styles));
