const client_id = process.env.CLOVA_CLIENT_ID;
const client_secret = process.env.CLOVA_CLIENT_SECRET;
const voiceType = ["nminyoung", "nshasha", "nheera", "nseungpyo", "nhajun"];
let requestQueue = [];
let isProcessing = false;
let strBuffer = '';


async function clovaTTS(text, socket, luckType, callback) {
  console.log('clovaTTS called text:', text);
  const api_url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
  const formData = new FormData();
  formData.append('speaker', voiceType[luckType - 1]);
  formData.append('volume', '0');
  formData.append('speed', '0');
  formData.append('pitch', '0');
  formData.append('text', text);
  formData.append('format', 'mp3');

  try {
    const response = await fetch(api_url, {
      method: 'POST',
      body: formData,
      headers: {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const DELAYTIME = 100;

    let audioBuffer = [];

    const transmitData = async () => {
      if (audioBuffer.length > 0) {
        await socket.emit('audioChunk', Buffer.concat(audioBuffer));
        audioBuffer = [];
      }
    };

    const transmitInterval = setInterval(transmitData, DELAYTIME);

    // 스트림 처리
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        clearInterval(transmitInterval);
        transmitData();
        break;
      }
      audioBuffer.push(value);
    }

  } catch (error) {
    console.error('Error during TTS request:', error);
    throw error;
  }
}

async function processQueue() {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { text, socket, luckType } = requestQueue.shift();

  try {
    await clovaTTS(text, socket, luckType);
  } catch (error) {
    console.error('Error in processQueue:', error);
  } finally {
    isProcessing = false;
    process.nextTick(processQueue);
  }
}

function tts(str, socket, luckType) {
  strBuffer += str;
  if (strBuffer.includes('.')||strBuffer.includes('?')||strBuffer.includes('!')) {
    text = strBuffer;
    requestQueue.push({ text, socket, luckType });
    processQueue();
    strBuffer = '';
  }
}

async function processWaitPromise() {
  return new Promise((resolve, reject) => {
    const waitInterval = setInterval(() => {
      if (!isProcessing && requestQueue.length === 0) {
        clearInterval(waitInterval);
        resolve();
      }
    }, 100);
  });
}

module.exports = {
  tts, processWaitPromise,
};
