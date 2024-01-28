const client_id = process.env.CLOVA_CLIENT_ID;
const client_secret = process.env.CLOVA_CLIENT_SECRET;
const request = require("request");
const voiceType = ["nminyoung", "nshasha", "nheera", "nseungpyo", "nhajun"];
let requestQueue = [];
let isPlaying = false;

function clovaTTS(text, socket, luckType, callback) {
  var api_url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
  var options = {
    url: api_url,
    form: {
      speaker: voiceType[luckType - 1],
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

    console.log("clovaTTS : ", options); 
 
  var _req = request.post(options).on("response", function (response) {
    console.log(response.statusCode); // 200
    console.log(response.headers["content-type"]);
  });

  _req.on("data", function (data) {
    console.log(data);
    socket.emit("audioChunk", data);
  });

  _req.on("end", function () {
    callback(null, "File has been written");
    isPlaying = false;
  });

  _req.on("error", function (err) {
    console.error("Error during TTS request:", err);
    callback(err);
  });
}

async function processQueue() {
  if (isPlaying || requestQueue.length === 0) return;

  isPlaying = true;

  const { text, socket, luckType } = requestQueue.shift();

  clovaTTS(text, socket, luckType, () => {
    
  });
}

function tts(text, socket, luckType) {
  requestQueue.push({ text, socket, luckType });
  processQueue();
}

module.exports = {
  tts,
};
