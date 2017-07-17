import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import CSSModules from 'react-css-modules';
import { Button, Glyphicon } from 'react-bootstrap';
import MobileDetect from 'mobile-detect';
import _ from 'lodash';
import Menu from './Menu';
import Timers from './Timers';
import SignInNSignUpDialog from '../components/SignInNSignUpDialog';
import Subject from '../components/Subject';
import authSignUpNSignIn from '../actions/authSignUpNSignIn';
import signOut from '../actions/signOut';
import savePresets from '../actions/savePresets';
import styles from './styles/App';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: false,
      phone: new MobileDetect(window.navigator.userAgent).phone(),
      title: 'Tabata Timer',
      openMenu: false,
      changePreset: false,
      changeSetting: false,
      play: false,
      reset: false,
      activeSubject: 'Welcome',
    };
    this.onReceiveMessage = this.onReceiveMessage.bind(this);
    this.renderSignInNSignOutHref = this.renderSignInNSignOutHref.bind(this);
    this.renderMenuBtn = this.renderMenuBtn.bind(this);
    this.renderPlayBtn = this.renderPlayBtn.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderTimers = this.renderTimers.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    window.addEventListener('message', this.onReceiveMessage);
  }

  componentWillReceiveProps() {
    const token = localStorage.getItem('token');
    // Sign in upon receiving user token
    if (!this.state.signIn && token) {
      this.setState({
        signIn: true,
        showSignInDialog: false,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Update presets to database when changed
    // if the menu is opened then exclude comparing data fields to avoid accessing database frequently
    if (nextState.signIn) {
      if (nextState.openMenu) {
        const currPresets = nextProps.presets.map(preset => _.omit(preset, ['data']));
        const nextPresets = this.props.presets.map(preset => _.omit(preset, ['data']));
        if (!_.isEqual(currPresets, nextPresets)) {
          this.props.savePresets(nextProps.presets);
        }
      } else {
        if (!_.isEqual(this.props.presets, nextProps.presets)) {
          this.props.savePresets(nextProps.presets);
        }
      }
    }
    return true;
  }

  componentWillUpdate() {}
  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('message', this.onReceiveMessage);
  }
  /*
   * clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
   * getter methods for render like getSelectReason() or getFooterContent()
   * optional render methods like renderNavigation() or renderProfilePicture()
   */

  onReceiveMessage(e) {
    if (e.data === 'Authorization succeeded') {
      const token = this.props.cookies.get('token');
      if (token) {
        localStorage.setItem('token', token);
        this.props.cookies.set('token', token, { expires: new Date() });
        this.props.authSignUpNSignIn(this.props.presets);
      }
    }
  }

  renderSignInNSignOutHref() {
    if (this.state.signIn) {
      return (
        <a
          styleName="signInNSignOut-href"
          role="link"
          onClick={() => {
            this.props.savePresets(this.props.presets);
            this.props.signOut();
            this.setState({ signIn: false, play: false, activeSubject: 'Welcome' });
          }}
        >
          <Glyphicon glyph="user" /> Sign Out
        </a>
      );
    } else {
      return (
        <a
          styleName="signInNSignOut-href"
          role="link"
          onClick={() => this.setState({ showSignInDialog: true, play: false })}
        >
          <Glyphicon glyph="user" /> Sign In
        </a>
      );
    }
  }

  renderMenuBtn() {
    if (this.state.openMenu) {
      return (
        <Button
          styleName="btn-menu"
          bsSize="large"
          onClick={() => {
            this.setState({
              openMenu: false,
              changeSetting: false,
            });
            // Update data fields to database
            if (this.state.signIn) {
              this.props.savePresets(this.props.presets);
            }
          }}
          active
        >
          <Glyphicon glyph="menu-hamburger" />
        </Button>
      );
    }
    return (
      <Button
        styleName="btn-menu"
        bsSize="large"
        onClick={() =>
          this.setState({
            openMenu: true,
            play: false,
            activeSubject: 'Welcome',
          })
        }
      >
        <Glyphicon glyph="menu-hamburger" />
      </Button>
    );
  }

  renderPlayBtn() {
    if (!this.state.changeSetting) {
      return (
        <Button styleName="playbtn-custom" bsSize="large" onClick={() => this.setState({ play: !this.state.play })}>
          <Glyphicon glyph={this.state.play ? 'pause' : 'play'} />
        </Button>
      );
    }
    return (
      <Button styleName="playbtn-custom" bsSize="large" disabled>
        <Glyphicon glyph="play" />
      </Button>
    );
  }

  renderMenu() {
    if (this.state.openMenu) {
      return (
        <Menu
          signIn={this.state.signIn}
          openMenu={this.state.openMenu}
          onChangePreset={() => {
            this.setState({ changePreset: true, play: false, activeSubject: 'Welcome' });
            setTimeout(() => this.setState({ changePreset: false }));
          }}
          onChangeSettings={(changeSetting) => {
            let newState = { changeSetting };
            if (changeSetting) {
              newState.play = false;
            }
            this.setState(newState);
          }}
        />
      );
    }
    return null;
  }

  renderContent() {
    if (!this.state.openMenu || !this.state.phone) {
      return (
        <div styleName="subject-wrapper">
          <Subject title={this.state.activeSubject} />
          <div styleName="btns-wrapper">
            { this.renderPlayBtn() }
            <Button
              styleName="resetbtn-custom"
              bsSize="large"
              onClick={() => {
                this.setState({ reset: true, play: false, activeSubject: 'Welcome' });
                setTimeout(() => this.setState({ reset: false }));
              }}
            >
              <Glyphicon glyph="repeat" />
            </Button>
          </div>
        </div>
      );
    }
    return null;
  }

  renderTimers() {
    if (!this.state.openMenu || !this.state.phone) {
      return (
        <Timers
          isSignIn={this.state.signIn}
          reset={this.state.reset}
          openMenu={this.state.openMenu}
          changePreset={this.state.changePreset}
          changeSetting={this.state.changeSetting}
          startTimer={this.state.play}
          onShowModifyNameDialog={() => this.setState({ play: false })}
          onChangeSubject={(activeSubject) => {
            if (activeSubject === 'Finished') {
              this.setState({ activeSubject, play: false, reset: true });
              setTimeout(() => this.setState({ reset: false }));
            } else {
              this.setState({ activeSubject });
            }
          }}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div styleName="app-wrapper">
        <header>
          <div styleName="title-wrapper">
            <div styleName="title">
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (this.state.openMenu) {
                    this.setState({ openMenu: false, changeSetting: false })
                  }
                }}
              >
                { this.state.title }
              </span>
            </div>
            { this.renderSignInNSignOutHref() }
            <SignInNSignUpDialog
              title={this.state.title}
              show={this.state.showSignInDialog}
              history={this.props.history}
              isPhone={this.state.phone}
              onClose={() => this.setState({ showSignInDialog: false })}
              onSignInOrSignUp={() => this.setState({ signIn: true, showSignInDialog: false })}
            />
            { this.renderMenuBtn() }
          </div>
          { this.renderMenu() }
          { this.renderContent() }
        </header>
        { this.renderTimers() }
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object,
};

function mapStateToProps({ presets }) {
  return { presets };
}

export default connect(mapStateToProps, { authSignUpNSignIn, signOut, savePresets })(withCookies(CSSModules(App, styles)));
