const express = require('express');
const router = express.Router();

// Import AWS SDK modules
// reference https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/javascript_secrets-manager_code_examples.html
const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// Secrets Manager 보안 암호 이름
const secret_name = "MySQL_Info";

// 리전 설정
const client = new SecretsManagerClient({
    region: "ap-northeast-2",
});

router.get('/MySQL', async (req, res) => {
    // Swagger 문서화
    // #swagger.summary = "시크릿 매니저를 통한 MySQL 정보 조회"
    // #swagger.description = 'SecretsManager Router Test -> MySQL'
    // #swagger.tags = ['Test']
    /*  #swagger.responses[200] = {
              description: 'MySQL 정보 조회 성공',}
      } */
    /*  #swagger.responses[400] = {
              description: '잘못된 요청',
      } */
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );

        const secret = JSON.parse(response.SecretString);

        // MySQL 정보를 하나의 객체로 묶음
        const mysqlInfo = {
            host: secret.host,
            user: secret.user,
            password: secret.password,
            database: secret.database
        };

        // 응답 반환 형식
        res.json({
            success: true,
            message: "SecretManage Success.",
            mysql: mysqlInfo
        });
    } catch (error) {
        console.error("비밀 정보를 가져오는 중 오류 발생:", error);
        res.status(500).json({ success: false, message: "비밀 정보를 가져오는 중 오류 발생" });
    }
});

module.exports = router;