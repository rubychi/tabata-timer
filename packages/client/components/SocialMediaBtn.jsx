import React from 'react';
import { Image } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './styles/SocialMediaBtn';

const SocialMediaBtn = (props) => {
  return (
    <div
      styleName="btn-wrapper"
      style={{ background: props.bgColor }}
      onClick={props.onClick}
    >
      <div styleName="overlay">
        <Image src={props.imgSrc} height={props.height} width={props.height} />
        <span styleName="text">{ props.text }</span>
      </div>
    </div>
  );
};

export default CSSModules(SocialMediaBtn, styles);
