import InputWithClearButton from './js/InputWithClearButton';
import InputWithActionSheet from './js/InputWithActionSheet';
import InputWithCalendar from './js/InputWithCalendar'

const multiFuncTextInput = {
    get InputWithClearButton() {return InputWithClearButton},
    get InputWithActionSheet() {return InputWithActionSheet},
    get InputWithCalendar() {return InputWithCalendar},
}

module.exports=multiFuncTextInput
