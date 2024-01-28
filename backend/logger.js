const winston = require("winston");
const winstonDailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const momentTimezone = require('moment-timezone');

// Winston의 로그 포맷을 설정
const {
  combine,
  timestamp,
  printf
} = winston.format;

// 출력할 로그 포맷 설정
const logFormat = printf(info => {
  let date = momentTimezone().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'); // 한국 시간으로 변환
  return `${date} ${info.level}: ${info.message}`;
});

// const fileTransport = new winston.transports.DailyRotateFile({
//   filename: "%DATE%.log",
//   datePattern: "YYYY-MM-DD",
//   maxSize: "20m",
//   maxFiles: "14d",
//   dirname: path.join(__dirname, "./logs"),
// });

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장

// Winston 로거 생성
const logger = winston.createLogger({
  level: "info", // 최소 로그 레벨
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(__dirname, logDir),
      filename: `%DATE%-info.log`,
      maxSize: "20m",
      maxFiles: 30,
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(__dirname, logDir),
      filename: `%DATE%-error.log`,
      maxSize: "20m",
      maxFiles: 30,
      zippedArchive: true,
    }),
    // http 레벨 로그를 저장할 파일 설정
    new winstonDailyRotateFile({
      level: 'http',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(__dirname, logDir),
      filename: `%DATE%-error.log`,
      maxSize: "20m",
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Express의 morgan 미들웨어와 함께 사용하기 위한 stream 설정
logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
