const express = require("express");
const commonResponse = require("../../middleware/commonResponse.js");
const db = require("../../mysql/database.js");
const gpt = require("../../chatgpt/api.js");
const router = express.Router();

router.get("/testgptsplit", async (req, res, next) => {
  // Swagger 문서화
  // #swagger.summary = "GPT-3 테스트"
  // #swagger.description = 'GPT-3를 테스트 해봅시다 :>'
  // #swagger.tags = ['Test']
  /*  #swagger.responses[200] = {
                description: '테스트 값 조회 성공',}
        } */
  /*  #swagger.responses[400] = {
                description: '잘못된 요청',
        } */
  let messages = [];
  let receivedMessage = [];
  let sendMessages = [];
  sendMessages.push(
    gpt.gptMessageForm("system", "JSON 형태로 데이터를 보내줘.")
  );
  // messages.push('1. 당신은 타로 전문가입니다. 다음의 순서로 진행합니다.');
  // messages.push('2. [질문]에 맞게 고른 카드를 순서대로 짧게 해석한 뒤, 종합적으로 해석한 내용을 깊이있고 친절하게 작성합니다.');
  // messages.push('질문 : 일하는데 스트레스를 너무 많이 받습니다. 이직을 하면 좋을 지 아니면 더 적응을 해야할 지 알려주세요');
  // messages.push('1번째 카드 : The Fool');
  // messages.push('2번째 카드 : The Magician');
  // messages.push('3번째 카드 : The High Priestess');

  const fs = require("fs");
  const text = fs.readFileSync("./routes/test/test.txt", "utf8");
  console.log("read text file : ", text);
  messages.push(text);

  sendMessages.push(gpt.gptMessageForm("user", messages.join("")));
  console.log(sendMessages);

  let data = "";
  let currentState = 0;
  let recv = [];
  try {
    const gptStream = await gpt.getGptJsonStream(sendMessages);

    for await (const chunk of gptStream) {
      if (chunk["choices"][0]["delta"]["content"]) {
        //console.log(chunk['choices'][0]['delta']['content']);
        receivedMessage.push(chunk["choices"][0]["delta"]["content"]);

        for (let char of chunk["choices"][0]["delta"]["content"]) {
          switch (currentState) {
            case 0: // "," 문자를 기다리는 상태
              if (char === ",") currentState = 1;
              break;

            case 1: // ":" 문자를 기다리는 상태
              if (char === ":") currentState = 2;
              if (char === "{") currentState = 0;
              break;

            case 2: // "문자를 기다리는 상태
              if (char === '"') {
                currentState = 3;
                continue;
              }
              break;
            case 3: // "문자를 기다리는 상태
              if (char === '"') {
                currentState = 0;
                recv.push(data);
                data = "";
              }
              break;
          }

          if (currentState === 3) {
            data += char;
            console.log("send : " + char);
          }
        }
      }
    }

    console.log(receivedMessage.join(""));
    console.log("recv : " + recv.join("\n"));
    res.locals.data = receivedMessage.join(""); // 조회 결과 → res.locals.data에 저장
  } catch (error) {
    if (error) {
      res.locals.status = 500;
      res.locals.data = {
        message: "데이터 조회 중 오류 발생 : ",
        error: error.message,
      };
      return next(); // 오류 발생 → commonResponse 미들웨어로 이동
    }
  }

  next(); // commonResponse 미들웨어로 이동
});

module.exports = router;
