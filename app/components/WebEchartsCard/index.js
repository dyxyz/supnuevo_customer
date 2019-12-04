import LineAndBarCharts from './js/LineAndBarCharts';
import LineAndBarTables from './js/LineAndBarTables';
import LineAndBarCards from './js/LineAndBarCards';
import PieTables from './js/PieTables';
import PieCharts from './js/PieCharts';
import PieCards from './js/PieCards';
import constants from './js/constants';

const WebEchartsCard = {
  get LineAndBarCharts() {return LineAndBarCharts},
  get LineAndBarTables() {return LineAndBarTables},
  get LineAndBarCards() {return LineAndBarCards},
  get PieCharts() {return PieCharts},
  get PieTables() {return PieTables},
  get PieCards() {return PieCards},
  get constants() {return constants},
}

module.exports=WebEchartsCard
