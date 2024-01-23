class StreamJson {
  constructor() {
    this.currentState = 0;
    this.index = 0;
  }

  status(char) {
    switch (this.currentState) {
      case 0: // "," 문자를 기다리는 상태
        if (char === ',')
          this.currentState = 1;
        break;
      case 1: // ":" 문자를 기다리는 상태
        if (char === ':')
          this.currentState = 2;
        if (char === '{')
          this.currentState = 0;
        break;
      case 2: // "문자를 기다리는 상태
        if (char === '"')
          this.currentState = 3;
        return 2; // 마지막 문자가 "이면 3을 반환
        break;
      case 3: // "문자를 기다리는 상태
        if (char === '"') {
          this.currentState = 0;
          this.index++;
          console.log('index : ' + this.index);
        }
        break;
    }

    return this.currentState;
  }

  parse(chunck) {
    let result = '';
    for (let char of chunck) {
      const index = this.index;

      if (this.status(char) === 3) {
        result += char;
      }

      if (index != this.index){
        result += '\n';
      }
    }
    return result;
  }

  parseByIndex(chunck, index) {
    let result = '';

    for (let char of chunck) {
      if (this.status(char) === 3) {
        if (this.index >= index) {
          result += char;
        }
      }
    }
    return result;
  }

  getIndex() {
    return this.index;
  }
}


module.exports = StreamJson;