// aws 시크릿 키를 위한 secrets-manager 모듈 블러오기
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');

let gptApiKey = null;

/**
 * AWS Secrets Manager에서 API 설정을 로드
 * @param {SecretsManagerClient} client - AWS Secrets Manager 클라이언트 인스턴스
 * @param {string} secretName - 가져올 비밀의 이름
 */
async function getKey(client, secretName) {
  let response;
  try {
    // AWS Secrets Manager에 GetSecretValueCommand를 보내어 저장해놓은 값을 로드
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT',
      })
    );
  } catch (error) {
    console.log('gpt_api의 key 불러오기 실패');
    throw error;
  }

  console.log('gpt_api의 key 불러오기 성공');

  // 가져온 비밀 값을 JSON 형식으로 파싱 → gptConfig 변수에 저장
  gptConfig = JSON.parse(response.SecretString);

  // 파싱된 api 키 값을 반환함
  return gptConfig.GptApiKey;
}

/**
 * 한 번 생성한 키는 다음에 생성하지 않도록 널 값인 경우에만 실행
 * @param {SecretsManagerClient} client
 * @param {string} secretName
 * @returns
 */
function loadGptApiKey(client, secretName) {
  if (!gptApiKey) gptApiKey = getKey(client, secretName);
  return gptApiKey;
}

module.exports = { loadGptApiKey };
