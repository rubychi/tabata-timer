import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Button, Glyphicon } from 'react-bootstrap';
import MobileDetect from 'mobile-detect';
import SignInDialog from './SignInDialog';
import Subject from './Subject';
import Menu from '../containers/Menu';
import Timers from '../containers/Timers';
import styles from './styles/App';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      phone: new MobileDetect(window.navigator.userAgent).phone(),
      title: 'Tabata Timer',
      openMenu: false,
      changePreset: false,
      changeSetting: false,
      play: false,
      reset: false,
      activeSubject: 'Welcome',
    };
    this.renderSignInNSignOutHref = this.renderSignInNSignOutHref.bind(this);
    this.renderMenuBtn = this.renderMenuBtn.bind(this);
    this.renderPlayBtn = this.renderPlayBtn.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderTimers = this.renderTimers.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  shouldComponentUpdate() {
    return true;
  }
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  /*
   * clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
   * getter methods for render like getSelectReason() or getFooterContent()
   * optional render methods like renderNavigation() or renderProfilePicture()
   */

  renderSignInNSignOutHref() {
    if (this.state.user) {
      return (
        <a
          styleName="signInNSignOut-href"
          role="link"
          onClick={() => this.setState({ user: '' })}
        >
          <Glyphicon glyph="user" /> Sign Out
        </a>
      );
    } else {
      return (
        <a
          styleName="signInNSignOut-href"
          role="link"
          onClick={() => this.setState({ showSignInDialog: true })}
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
          onClick={() =>
            this.setState({
              openMenu: false,
              changeSetting: false,
            })
          }
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
          this.setState({ openMenu: true })
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
          user={this.state.user}
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
          reset={this.state.reset}
          changePreset={this.state.changePreset}
          changeSetting={this.state.changeSetting}
          startTimer={this.state.play}
          onStartCycle={(activeSubject) => {
            if (activeSubject === 'Finished') {
              this.setState({ activeSubject, play: false });
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
            <span styleName="title">{ this.state.title }</span>
            { this.renderSignInNSignOutHref() }
            <SignInDialog
              title={this.state.title}
              show={this.state.showSignInDialog}
              onClose={() => this.setState({ showSignInDialog: false })}
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

export default CSSModules(App, styles);
