// mysql 설정
const mysql = require('mysql');
const dbconfig = require('./mysql/database');
const pool = mysql.createPool(dbconfig);

// connection pool 모듈화
module.exports = pool;
