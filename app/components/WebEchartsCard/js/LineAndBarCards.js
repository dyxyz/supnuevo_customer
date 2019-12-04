/**
 * LineAndBarCard.js
 * 折线 & 柱状图
 */

import React from 'react';
import PropTypes from 'prop-types';
import LineAndBarCharts from './LineAndBarCharts';
import LineAndBarTables from './LineAndBarTables';

export default class LineAndBarCards extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const param = this.props;

    return (
        [
          <LineAndBarCharts {...param} />,
          <LineAndBarTables {...param} />
        ]
    );
  }
}
