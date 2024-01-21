const PromptService = require('./service/promptService');
const MysqlPromptRepository = require('./repository/mysqlPromptRepository');

class AppConfig {
    
    promptRepository() {
        return new MysqlPromptRepository();
    }

    promptService() {
        return new PromptService(this.promptRepository())
    }
    
} 

module.exports = AppConfig;