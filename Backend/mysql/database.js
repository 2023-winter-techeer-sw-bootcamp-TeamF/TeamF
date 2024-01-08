const mysql = require('mysql');
let connection;

function initializeConnection(dbConfig) {
    connection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
    });

    connection.connect(error => {
        if (error) {
            console.error('데이터베이스 연결 중 오류 발생:', error);
            return;
        }
        console.log('데이터베이스 연결 성공');
    });

    return connection;
}

function getConnection() {
    if (!connection) {
        throw new Error('데이터베이스 연결이 초기화되지 않았습니다.');
    }
    return connection;
}

module.exports = { initializeConnection, getConnection };
