const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");

function configureAwsClient() {
    const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const awsRegion = process.env.AWS_REGION;

    return new SecretsManagerClient({
        region: awsRegion,
        credentials: {
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey
        }
    });
}

module.exports = { configureAwsClient };
