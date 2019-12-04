/**
 * LineAndBarCard.js
 * 折线 & 柱状图
 */

import React from 'react';
import PropTypes from 'prop-types';
import PieTables from '../js/PieTables';
import PieCharts from '../js/PieCharts'

export default class PieCards extends React.PureComponent {

  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {
    const params = this.props;

    return (
        [
          <PieCharts {...params} />,
          <PieTables {...params} />
        ]
    );
  }
}

PieCards.propTypes = {
  title: PropTypes.string,
  name: PropTypes.array,
  data: PropTypes.array,
}
