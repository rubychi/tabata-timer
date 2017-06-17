import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import _ from 'lodash';
import { Image } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import styles from './styles/SocialMediaBtn';

const SocialMediaBtn = (props) => {
  return (
    <div styleName="btn-wrapper" style={{ background: props.bgColor }}>
      <div styleName="overlay">
        <Image src={props.imgSrc} height={props.height} width={props.height} />
        <span styleName="text">{ props.text }</span>
      </div>
    </div>
  );
};

export default CSSModules(SocialMediaBtn, styles);
