const { SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");

function configureAwsClient() {
    const a01 = 'AKIA4VFKZCU3VLHZKPVJ';
    const a02 = 'r3wUuwnSQfmwZ6yhWxf1zVq0n4mjL9PijxR5VPbl';
    const a03 = 'ap-northeast-2';
    return new SecretsManagerClient({
        region: a03,
        credentials: {
            accessKeyId: a01,
            secretAccessKey: a02
        }
    });
}

module.exports = { configureAwsClient };
