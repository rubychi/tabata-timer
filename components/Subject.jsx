import React from 'react';
import CSSModules from 'react-css-modules';
import { Well } from 'react-bootstrap';
import styles from './styles/Subject';

const Subject = (props) => {
  return (
    <Well styleName="well-custom" bsSize="large">{props.title}</Well>
  );
};

export default CSSModules(Subject, styles);
