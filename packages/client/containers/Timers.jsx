import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import Sound from 'react-sound';
import { Modal, Glyphicon, FormControl, Button } from 'react-bootstrap';
import { getActivePreset } from '../selectors/presetsSelectors';
import savePresets from '../actions/savePresets';
import setTitles from '../actions/setTitles';
import Timer from '../components/Timer';
import styles from './styles/Timers';

class Timers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: null,
      kickStart: false,
      startRound: false,
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
    // Initialize state when sign in/out
    if ((this.props.isSignIn !== nextProps.isSignIn) ||
      nextProps.openMenu ||
      nextProps.reset ||
      nextProps.changePreset ||
      nextProps.changeSetting
    ) {
      this.initState(nextProps.activePreset);
      /* A workaround for solving audio issue on mobile devices */
      this.setState({ kickStart: false });
    }

    /* A workaround for solving audio issue on mobile devices */
    if (nextProps.startTimer) {
      if (!this.state.kickStart) {
        this.setState({ kickStart: true, playSound: true });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  modifyName(id, modifyName) {
    this.props.onShowModifyNameDialog();
    this.setState({ showModifyTitleDialog: true, modifyId: id, modifyName });
  }

  saveModifiedName(e) {
    if (e.type === 'click' ||
      (e.type === 'keypress' && e.key === 'Enter')) {
      const value = this.modifyNameInput.value;
      if (!value.trim()) {
        this.setState({ titleValidationState: 'error' });
      } else {
        let newCycles = _.cloneDeep(this.state.cycles);
        const idx = _.findIndex(newCycles, { id: this.state.modifyId });
        newCycles[idx].title = value;
        // If it's current active subject then change the title right away
        if (idx === 0) {
          this.props.onChangeSubject(`T${this.state.curTabata + 1}: ${value}`);
        }
        this.props.setTitles({
          id: this.props.activePreset.id,
          titles: _.sortBy(newCycles, 'origIdx').map((item) => { return(item.title); })
        });
        this.props.savePresets(this.props.presets);
        this.setState({
          cycles: newCycles,
          titleValidationState: null,
          showModifyTitleDialog: false,
        });
      }
    }
  }

  closeModifyTitleDialog() {
    this.setState({ titleValidationState: null, showModifyTitleDialog: false });
  }

  tick() {
    if (this.props.startTimer) {
      if (this.state.curTabata <= this.state.tabatas) {
        let newState = _.cloneDeep(this.state);
        let curCycle = newState.cycles[0];
        let finCycleFlag = false;
        if (curCycle.prepareActive !== undefined) {
          if (!curCycle.prepareActive) {
            curCycle.prepareActive = true;
            newState.curTabata += 1;
            if (newState.curTabata <= this.state.tabatas) {
              // The previous round has finished
              if (!curCycle.prepare) {
                curCycle.prepare = 100;
                const restCycles = newState.cycles.slice(1).map((item) => {
                  item.work = 100;
                  item.rest = 100;
                  return item;
                });
                newState.startRound = true;
                newState.cycles = [curCycle, ...restCycles];
              }
              this.props.onChangeSubject(`T${newState.curTabata}: ${newState.cycles[0].title}`);
            }
          } else {
            if (curCycle.prepare) {
              curCycle.prepare -= (100 / this.state.prepare);
              newState.startRound = false;
              if (curCycle.prepare <= 0) {
                curCycle.prepare = 0;
                newState.playSound = true;
                curCycle.prepareActive = false;
                if (newState.curTabata <= this.state.tabatas) {
                  finCycleFlag = true;
                }
              }
            }
          }
        } else {
          if (!curCycle.workActive && !curCycle.restActive) {
            curCycle.workActive = true;
          }
          if (curCycle.workActive) {
            if (curCycle.work) {
              curCycle.work -= (100 / this.state.work);
              if (curCycle.work <= 0) {
                curCycle.work = 0;
                newState.playSound = true;
                curCycle.workActive = false;
                curCycle.restActive = true;
                this.props.onChangeSubject(`Next: ${newState.cycles[1].title}`);
              }
            }
          } else if (curCycle.restActive) {
            if (curCycle.rest) {
              curCycle.rest -= (100 / this.state.rest);
              if (curCycle.rest <= 0) {
                curCycle.rest = 0;
                newState.playSound = true;
                curCycle.restActive = false;
                finCycleFlag = true;
              }
            }
          }
        }
        newState.cycles[0] = curCycle;
        if (finCycleFlag) {
          let shifted = newState.cycles.shift();
          newState.cycles.push(shifted);
          // If it's not the next round then change subject title
          if (newState.cycles[0].prepareActive === undefined) {
            this.props.onChangeSubject(`T${newState.curTabata}: ${newState.cycles[0].title}`);
          }
        }
        this.setState(newState);
      } else {
        this.props.onChangeSubject('Finished');
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
      curTabata: 0,
      cycles: [{
        id: uuidV4(),
        origIdx: 0,
        title: state.userDefinedTitles ? state.userDefinedTitles[0] || 'Prepare' : 'Prepare',
        origPrepare: presetSettings.prepare,
        prepare: 100,
        prepareActive: false,
      }, ..._.times(presetSettings.cycles, function(n) {
        return {
          id: uuidV4(),
          origIdx: n + 1,
          title: state.userDefinedTitles ? state.userDefinedTitles[n + 1] || `Cycle ${n + 1}` : `Cycle ${n + 1}`,
          origWork: presetSettings.work,
          work: 100,
          workActive: false,
          origRest: presetSettings.rest,
          rest: 100,
          restActive: false,
        };
      })],
    });
  }

  renderTimers() {
    let timers = [];
    timers.push(this.state.cycles.map((timer) => {
      const { id, title, origPrepare, prepare, prepareActive, origWork, work, workActive, origRest, rest, restActive } = timer;
      if (prepare !== undefined) {
        return (
          <Timer
            key={id}
            id={id}
            title={title}
            timer1={origPrepare}
            progress1={prepare}
            p1Style="success"
            p1Active={prepareActive}
            progress2={null}
            onModifyName={this.modifyName}
            startRound={this.state.startRound}
          />
        );
      } else {
        return (
          <Timer
            key={id}
            id={id}
            title={title}
            timer1={origWork}
            timer2={origRest}
            progress1={work}
            p1Style="danger"
            p1Active={workActive}
            progress2={rest}
            p2Style="warning"
            p2Active={restActive}
            onModifyName={this.modifyName}
            startRound={this.state.startRound}
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
          url="https://raw.githubusercontent.com/rubychi/tabata-timer/master/packages/client/assets/sounds/beep.mp3"
          playStatus={this.state.playSound ? Sound.status.PLAYING : Sound.status.PAUSED}
          onFinishedPlaying={() => this.setState({ playSound: false })}
        />
        <Modal
          show={this.state.showModifyTitleDialog}
          onEntered={() => this.modifyNameInput.focus()}
          onHide={this.closeModifyTitleDialog}
          onKeyPress={this.saveModifiedName}
        >
          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph="edit" /> Modify name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={this.state.titleValidationState ? `form-group has-${this.state.titleValidationState}` : 'form-group'}>
              <FormControl
                inputRef={(ref) => { this.modifyNameInput = ref; }}
                type="text"
                value={this.state.modifyName}
                onChange={(e) => {
                  if (this.state.titleValidationState) {
                    this.setState({
                      modifyName: e.target.value,
                      titleValidationState: null,
                    });
                  } else {
                    this.setState({
                      modifyName: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="dialog-footer-btn"
              bsStyle="primary"
              onClick={this.saveModifiedName}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    presets: state.presets,
    activePreset: getActivePreset(state),
  };
}

export default connect(mapStateToProps, { savePresets, setTitles })(CSSModules(Timers, styles));
