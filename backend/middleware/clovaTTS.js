const client_id = process.env.CLOVA_CLIENT_ID;
const client_secret = process.env.CLOVA_CLIENT_SECRET;
const voiceType = {
  name: ["nminseo", "ngoeun", "nsunhee", "nseungpyo", "nwoof"],
  speed: [ -1, -2, -2, -2, -2],
  pitch: [ 0, 0, 0, 0, -1],
  alpah: [ 1, 0, 0, -2, -1],
};


class ClovaTTS {

  constructor() {
    this.isProcessing = false;
    this.requestQueue = [];
    this.strBuffer = '';
  }

  async clovaTTS(text, socket, luckType) {
    console.log('clovaTTS called text:', text);
    const api_url = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
    const formData = new FormData();
    formData.append('speaker', voiceType.name[luckType - 1]);
    formData.append('volume', '0');
    formData.append('speed', voiceType.speed[luckType - 1]);
    formData.append('pitch', voiceType.pitch[luckType - 1]);
    formData.append('alpha', voiceType.alpah[luckType - 1]);
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
  
  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;
  
    this.isProcessing = true;
    const { text, socket, luckType } = this.requestQueue.shift();
  
    try {
      await this.clovaTTS(text, socket, luckType);
    } catch (error) {
      console.error('Error in processQueue:', error);
    } finally {
      this.isProcessing = false;
      process.nextTick(() => this.processQueue());  
    }
  }
  
  tts(str, socket, luckType) {
    this.strBuffer += str;
    if (this.strBuffer.includes('.')||this.strBuffer.includes('?')||this.strBuffer.includes('!')||this.strBuffer.includes(',')){
      const text = this.strBuffer
      this.requestQueue.push({ text, socket, luckType });
      this.processQueue();
      this.strBuffer = '';
    }
  }
  
  async processWaitPromise() {
    return new Promise((resolve, reject) => {
      const waitInterval = setInterval(() => {
        if (!this.isProcessing && this.requestQueue.length === 0) {
          clearInterval(waitInterval);
          resolve();
        }
      }, 100);
    });
  }
}



module.exports = ClovaTTS;