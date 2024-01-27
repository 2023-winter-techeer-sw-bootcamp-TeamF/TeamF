var client_id = process.env.client_id;
var client_secret = process.env.client_secret;
var fs = require("fs");
const request = require("request");
const socketIo = require("socket.io");

function clovaTTS(text, socket, callback) {
  var api_url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
  var options = {
    url: api_url,
    form: {
      speaker: "nara",
      volume: "0",
      speed: "0",
      pitch: "0",
      text: text,
      format: "mp3",
    },
    headers: {
      "X-NCP-APIGW-API-KEY-ID": client_id,
      "X-NCP-APIGW-API-KEY": client_secret,
    },
  };

  var writeStream = fs.createWriteStream("./tts1.mp3");
  var _req = request.post(options).on("response", function (response) {
    console.log(response.statusCode); // 200
    console.log(response.headers["content-type"]);
  });

  _req.pipe(writeStream); // file로 출력
  _req.on("end", function () {
    console.log("File has been written");
    callback(null, "File has been written");

    // 파일 작성이 끝나면 클라이언트로 음성 전송
    const audioBuffer = fs.readFileSync("./tts1.mp3");
    const audioBase64 = audioBuffer.toString("base64");
    socket.emit("audio", audioBase64);
  });

  _req.on("error", function (err) {
    console.error("Error during TTS request:", err);
    callback(err);
  });
}

module.exports = {
  clovaTTS,
};
