function isNotCardValid(card) {
    let result = false;
    if (card === 'undefined' || card === null || card === '') // 값이 없는 경우
        result = true;
    if (Number(card) < 1 || Number(card) > 78) // 카드 번호가 1~78이 아닌 경우
        result =  true;

    return result;
}

function toCardArray(cards) {
    if (typeof cards !== 'string') {
        throw new InvalidDataError();
    }
    let cardsArray = cards.split(',');
    console.log(cardsArray);

    for (let card of cardsArray) {
        if (isNotCardValid(card)) 
            throw new InvalidCardNumberError()
    }
    return cardsArray;
}

function toCardMessage(cardsArray) { 
    let answers = {};
    cardsArray.forEach((card, index) => {
        answers['card' + (index + 1)] = card;
    });
    return answers;
}

function toVerifyCardArray(cards) {
    let cardsArray = typeof cards === 'string' ? toCardArray(cards) : cards;

    if (!Array.isArray(cardsArray)) {
        throw new InvalidDataError();
    }

    return cardsArray;
}

class InvalidDataError extends Error {
    constructor() {
        super('유효하지 않은 데이터입니다. (널 값, 누락 등)');
    }
}

class InvalidCardNumberError extends Error {
    constructor() {
        super('카드 번호가 유효하지 않습니다.');
    }
}


module.exports = {
    toCardArray,
    toCardMessage,
    toVerifyCardArray
};
