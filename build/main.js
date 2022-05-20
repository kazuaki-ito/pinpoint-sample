"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
const awsRegion = process.env.AWS_REGION || '';
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const awsSecretKey = process.env.AWS_SECRET_KEY || '';
const senderAddress = process.env.FROM_ADDR || '';
const toAddress = process.env.TO_ADDR || '';
const appId = process.env.PINPOINT_PROJECT_ID || '';
const subject = "タイトル";
const bodyText = `本文
行1
行2`;
const bodyHtml = `<html>
<head></head>
<body>
  <h1>タイトル</h1>
  <p>本文
    <a href='https://aws.amazon.com/pinpoint/'>the Amazon Pinpoint API</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;
const charset = "UTF-8";
// Specify that you're using a shared credentials file.
// AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'isoshi-moustache'})
// Specify the region.
aws_sdk_1.default.config.update({
    credentials: new aws_sdk_1.default.Credentials(awsAccessKeyId, awsSecretKey),
    region: awsRegion
});
//Create a new Pinpoint object.
const pinpoint = new aws_sdk_1.default.Pinpoint();
// Specify the parameters to pass to the API.
const params = {
    ApplicationId: appId,
    MessageRequest: {
        Addresses: {
            [toAddress]: {
                ChannelType: 'EMAIL'
            }
        },
        MessageConfiguration: {
            EmailMessage: {
                FromAddress: senderAddress,
                SimpleEmail: {
                    Subject: {
                        Charset: charset,
                        Data: subject
                    },
                    HtmlPart: {
                        Charset: charset,
                        Data: bodyHtml
                    },
                    TextPart: {
                        Charset: charset,
                        Data: bodyText
                    }
                }
            }
        }
    }
};
console.info('sendingMessages');
pinpoint.sendMessages(params, function (err, data) {
    console.info('sentMessage');
    if (err) {
        console.error(err);
    }
    else {
        console.info(data);
    }
});
