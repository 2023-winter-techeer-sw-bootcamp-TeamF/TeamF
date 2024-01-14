const gpt = require('../chatgpt/api');

class GptMessage {
  constructor() {
    this.TotalMessages = [];
    this.userMessages = [];
    this.systemMessages = [];
    this.assistantMessages = [];
  }

  addUserMessage(message) {
    this.userMessages.push(message);
  }

    addSystemMessage(message) {
        this.systemMessages.push(message);
    }

    addAssistantMessage(message) {
        this.assistantMessages.push(message);
    }

    getMessages() {
        if(this.userMessages != [])
            this.TotalMessages.push(gpt.gptMessageForm('system', this.systemMessages.join('')));
        if(this.systemMessages != [])
            this.TotalMessages.push(gpt.gptMessageForm('user', this.userMessages.join('')));
        if(this.assistantMessages != [])
            this.TotalMessages.push(gpt.gptMessageForm('assistant', this.assistantMessages.join('')));
        return this.TotalMessages;
    }
}

module.exports = GptMessage;