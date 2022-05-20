"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const awsRegion = "ap-northeast-1";
const toAddress = "kazuaki-ito@kslaboratory.com";
aws_sdk_1.default.config.credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'isoshi-moustache' });
aws_sdk_1.default.config.update({ region: awsRegion });
const pinpointEmail = new aws_sdk_1.default.PinpointEmail();
const createIdentifyParams = {
    EmailIdentity: toAddress, /* required */
};
pinpointEmail.createEmailIdentity(createIdentifyParams, function (err, data) {
    if (err)
        console.error(err, err.stack); // an error occurred
    else
        console.info(data); // successful response
});
