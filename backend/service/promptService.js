class PromptService {
    constructor(promptDao) {
        this.promptDao = promptDao;
    }

    async getUserPrompt(luckId) {
        const prompt = await this.promptDao.findUserByLuckId(luckId);
        return prompt;
    }

    async getSystemPrompt(luckId) {
        const prompt = await this.promptDao.findSystemByLuckId(luckId);
        return prompt;
    }
}

module.exports = PromptService;