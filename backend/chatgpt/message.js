
const gpt = require('../chatgpt/api');


class GptMessage {
  constructor() {
    this.TotalMessages = new Array();
    this.userMessages = new String();
    this.systemMessages = new String();
    this.assistantMessages = new String();
  }

  addUserMessage(message) {
    this.userMessages += message;
  }

  addSystemMessage(message) {

    this.systemMessages += message + '\n';
  }

  addAssistantMessage(message) {
    this.assistantMessages += message + '\n';
  }

  addUserCardsArrayMessage(cardsArray) {
    let cardNum = 1;
    for (const element of cardsArray) {
        this.addUserMessage(`\n${cardNum}번째 카드 : ${element},`);
        cardNum++;
    }
  }

  getMessages() {
    // 문자열이 차있는지 확인
    if (this.userMessages != '') this.TotalMessages.push(gpt.gptMessageForm('system', this.systemMessages));
    if (this.systemMessages != '') this.TotalMessages.push(gpt.gptMessageForm('user', this.userMessages));
    if (this.assistantMessages != '') this.TotalMessages.push(gpt.gptMessageForm('assistant', this.assistantMessages));
    return this.TotalMessages;
  }
}

module.exports = GptMessage;
