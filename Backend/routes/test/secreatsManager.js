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

router.get('/get-secret', async (req, res) => {
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
            url: secret.MYSQL_URL,
            id: secret.MYSQL_ID,
            pw: secret.MYSQL_PW
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