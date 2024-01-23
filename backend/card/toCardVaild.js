const s3 = require('../aws/awsS3');

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

async function createVerifyCardObjectArray(cards) {
    let result = [];
    const cardsArray = toVerifyCardArray(cards);
    for (const card of cardsArray) {
        const cardIndex = s3.findIndex(card); // 카드 번호를 통해 S3에서 파일의 인덱스를 가져옴
        const cardData = await s3.getDataObject(cardIndex); // 파일명을 통해 데이터를 가져옴
        cardData.number = Number(cardData.number); // number를 숫자로 변환
        result.push(cardData);
    }
    return result;
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
    toVerifyCardArray,
    createVerifyCardObjectArray
};
