const express = require('express');
const router = express.Router();
const { configureAwsClient } = require('../../aws/awsClientConfig');

// Secrets Manager 보안 암호 이름
const secretName = "MySQL_Info";

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
        const client = configureAwsClient(); // AWS 클라이언트 인스턴스화
        const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT",
            })
        );

        const secret = JSON.parse(response.SecretString);

        res.json({
            success: true,
            message: "SecretManager Success.",
            mysql: secret
        });
    } catch (error) {
        console.error("Error retrieving secret:", error);
        res.status(500).json({ success: false, message: "Error retrieving secret" });
    }
});

module.exports = router;