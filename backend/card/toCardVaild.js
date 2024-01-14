
function toCardArray(cards) {
    let cardsArray = [];
    // 문자열로 들어온 카드 정보를 배열로 만든다.
    let buffer = cards.split(',');
    
    for (let card of buffer) {
        cardsArray.push(card);
    }
    return cardsArray;
}

function toCardMessage(cardsArray) { 
    let messages = [];
    let cardNum = 1;
    let answers = {};

    for (let card of cardsArray) {
        messages.push(card);
        answers['card' + cardNum] = card;
        cardNum++;
    }
    return answers;
}

function toVerifyCardObj(cards) {
    let cardsArray = [];
    if (typeof cards === 'string') {
        cardsArray = toCardArray(cards);
    }
    if (typeof cards === 'object') {
        cardsArray = cards;
    }
    
    return toCardMessage(cardsArray);
}

function toVerifyCardArray(cards) {
    let cardsArray = [];
    if (typeof cards === 'string') {
        cardsArray = toCardArray(cards);
    }
    if (typeof cards === 'object') {
        cardsArray = cards;
    }
    return cardsArray;
}

module.exports = {
    toCardArray,
    toCardMessage,
    toVerifyCardObj,
    toVerifyCardArray
};