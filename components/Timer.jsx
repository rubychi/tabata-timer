import React from 'react';
import { Panel, ProgressBar } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import uuidV4 from 'uuid/v4';
import styles from './styles/Timer';

const Timer = (props) => {
  const {title, progress1, progress2, p1Style, p2Style, p1Active, p2Active} = props;

  let progressBars = [];
  if (p1Active) {
    progressBars.push(
      <ProgressBar
        key={uuidV4()}
        bsStyle={p1Style}
        now={progress1}
        active
      />
    );
  } else {
    progressBars.push(
      <ProgressBar
        key={uuidV4()}
        bsStyle={p1Style}
        now={progress1}
      />
    );
  }
  if (progress2 !== null) {
    if (p2Active) {
      progressBars.push(
        <ProgressBar
          key={uuidV4()}
          bsStyle={p2Style}
          now={progress2}
          active
        />
      );
    } else {
      progressBars.push(
        <ProgressBar
          key={uuidV4()}
          bsStyle={p2Style}
          now={progress2}
        />
      );
    }
  }
  return (
    <Panel
      styleName="panel-custom"
      header={title}
      eventKey="1"
      onClick={() => props.onModifyName(props.id, title)}
    >
      {progressBars}
    </Panel>
  );
};

export default CSSModules(Timer, styles);
