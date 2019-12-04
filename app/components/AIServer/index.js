import AISearchBar from './js/AISearchBar';
import AIAnswerBoard from './js/AIAnswerBoard';
import AIDataBoard from './js/AIDataBoard';
import AIDataDisplay from "./js/AIDataDisplay";

const AIServer = {
    get AISearchBar() {return AISearchBar},
    get AIAnswerBoard() {return AIAnswerBoard},
    get AIDataBoard() {return AIDataBoard},
    get AIDataDisplay() {return AIDataDisplay},
}

module.exports = AIServer;
