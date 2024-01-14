const gpt = require('../chatgpt/api');
const systemPrompt = new String(`
JSON 형태로 데이터를 보내줘
`);
const prompt = new String(`
1. 당신은 타로 전문가입니다. 다음의 순서로 진행합니다.
2. [질문]에 맞게 고른 카드를 순서대로 짧게 해석한 뒤, 종합적으로 해석한 내용을 깊이있고 친절하게 작성합니다.
질문 : `);

const jsonFormPrompt = new String(`
보내줄 데이터 형식
{
  "카드해석": [
    {
      "1번째 카드": "The Fool",
      "해석": "새로운 시작과 모험을 상징합니다. 현재 상황에서 벗어나 새로운 기회를 탐색할 시기일 수 있음을 나타냅니다."
    },
    {
      "2번째 카드": "The Magician",
      "해석": "자신의 능력과 자원을 활용하여 원하는 결과를 만들어낼 수 있는 힘을 상징합니다. 새로운 환경에서 당신의 재능을 발휘할 수 있는 기회가 있음을 의미합니다."
    },
    {
      "3번째 카드": "The High Priestess",
      "해석": "내면의 지혜와 직관을 신뢰해야 한다는 메시지입니다. 결정을 내릴 때 내면의 목소리에 귀 기울여야 함을 강조합니다."
    }
  ],
  "종합해석": "이 세 카드는 현재 직장에서의 스트레스를 벗어나 새로운 시작을 모색하는 것이 유익할 수 있음을 시사합니다. 'The Fool'은 새로운 모험을 시작할 준비가 되어 있음을, 'The Magician'은 새로운 환경에서 성공적으로 적응할 수 있는 능력이 있음을 나타냅니다. 그러나 'The High Priestess'는 깊은 내면의 지혜와 직관을 따르라는 조언을 줍니다. 이직 결정은 당신의 내면적인 목소리와 현재의 상황을 신중히 고려하여 내려야 합니다. 새로운 기회를 탐색하는 데 적극적이되, 내면의 목소리도 귀 기울이며, 결정을 내릴 때 완전히 고려하는 것이 중요합니다."
}
`);

class GptMessage {
  constructor() {
    this.TotalMessages = new Array();
    this.userMessages = new String();
    this.systemMessages = new String();
    this.assistantMessages = new String();

    this.addSystemMessage(systemPrompt);
  }

  addUserMessage(message) {
    this.userMessages += message + '\n';
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
        this.addUserMessage(`${cardNum}번째 카드 : ${element},\n`);
        cardNum++;
    }
  }

  addUserTestMessage() {
    this.addUserMessage(prompt);
  }

  addUserJsonFormMessage() {
    this.addUserMessage(jsonFormPrompt);
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
