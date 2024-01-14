const gpt = require('../chatgpt/api');

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
