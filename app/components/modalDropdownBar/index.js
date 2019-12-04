import DropdownCell from './js/DropdownCell';
import OrderDropdownCell from './js/OrderDropdownCell';

const modalDropdownBar = {
    get DropdownCell() {return DropdownCell},
    get OrderDropdownCell() {return OrderDropdownCell},
}

module.exports = modalDropdownBar
