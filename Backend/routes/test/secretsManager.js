const express = require('express');
const router = express.Router();
const { configureAwsClient } = require('../../middleware/awsClientConfig');

// Secrets Manager 보안 암호 이름
const secretName = "MySQL_Info";

router.get('/MySQL', async (req, res) => {
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