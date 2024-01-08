// AWS SDK를 import → AWS Secrets Manager에 접근
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

// 데이터베이스 설정을 저장할 변수를 null로 초기화
let dbConfig = null;

/**
 * AWS Secrets Manager에서 데이터베이스 설정을 로드
 * @param {SecretsManagerClient} client - AWS Secrets Manager 클라이언트 인스턴스
 * @param {string} secretName - 가져올 비밀의 이름
 */
async function loadDBConfig(client, secretName) {
    // AWS Secrets Manager에 GetSecretValueCommand를 보내어 저장해놓은 값을 로드
    const response = await client.send(new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
    }));
    // 가져온 비밀 값을 JSON 형식으로 파싱 → dbConfig 변수에 저장
    dbConfig = JSON.parse(response.SecretString);
    /**
     * 파싱하는 이유
     * 
     * AWS Secrets Manager의 GetSecretValueCommand를 통해 반환되는
     * JSON 형식의 문자열을 JavaScript 객체로 변환을 통해 데이터 접근 용이성이 향상되고,
     * 안전하게 구조화하여 데이터를 처리하고 사용하는 과정에서 오류를 줄이며,
     * 명확한 데이터 구조로 활용 가능함.
     */
}

// 로드된 데이터베이스 설정을 반환하는 getDBConfig();
function getDBConfig() {
    if (!dbConfig) {
        throw new Error("DB 설정이 로드되지 않았습니다.");
    }
    return dbConfig;
}

// loadDBConfig 및 getDBConfig 함수를 모듈로 내보내서
// 다른 곳에서 import해 사용
module.exports = { loadDBConfig, getDBConfig };
