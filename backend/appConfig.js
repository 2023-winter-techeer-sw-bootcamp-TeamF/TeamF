const PromptService = require('./service/promptService');
const MysqlPromptRepository = require('./repository/mysqlPromptRepository');
const LuckListService = require('./service/luckListService');
const MysqlLuckListRepository = require('./repository/mysqlLuckListRepository');

class AppConfig {
    
    promptRepository() {
        return new MysqlPromptRepository();
    }

    promptService() {
        return new PromptService(this.promptRepository())
    }

    LuckListRepository() {
        return new MysqlLuckListRepository();
    }

    LuckListService() {
        return new LuckListService(this.LuckListRepository())
    }
    
} 

module.exports = AppConfig;