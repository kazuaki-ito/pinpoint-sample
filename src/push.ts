import AWS from 'aws-sdk'
import 'dotenv/config'

const awsRegion: string = process.env.AWS_REGION || ''
const awsAccessKeyId: string = process.env.AWS_ACCESS_KEY_ID || ''
const awsSecretKey: string = process.env.AWS_SECRET_KEY || ''
const toAddress: string = process.env.TO_ADDR || ''
const appId: string = process.env.PINPOINT_PROJECT_ID || ''

const subject = "タイトル"

const bodyText = `本文
行1
行2`

var recipient = {
  'token': toAddress,
  'service': 'GCM'
};

const charset = "UTF-8"

// Specify the region.
AWS.config.update({
  credentials: new AWS.Credentials(
    awsAccessKeyId,
    awsSecretKey
  ),
  region: awsRegion
})

function CreateMessageRequest() {
  var token = recipient['token'];

  var messageRequest = {
    'Addresses': {
      [token]: {
        'ChannelType': 'GCM'
      }
    },
    'MessageConfiguration': {
      'GCMMessage': {
        'Action': 'OPEN_APP',
        'Body': bodyText,
        'Priority': 'normal',
        'SilentPush': false,
        'Title': subject,
        'TimeToLive': 3000
      }
    }
  };
  return messageRequest
}

function ShowOutput(data: any) {
  if (data["MessageResponse"]["Result"][recipient["token"]]["DeliveryStatus"]
    == "SUCCESSFUL") {
    const status = "Message sent! Response information: ";
    console.log(status);
  } else {
    const status = "The message wasn't sent. Response information: ";
    console.log(status);
  }

  console.dir(data, {depth: null});
}

//Create a new Pinpoint object.
const pinpoint = new AWS.Pinpoint()

function SendMessage() {
  const messageRequest = CreateMessageRequest();

  // Specify that you're using a shared credentials file, and specify the
  // IAM profile to use.
  //Create a new Pinpoint object.
  const params = {
    "ApplicationId": appId,
    "MessageRequest": messageRequest
  };

  // Try to send the message.
  pinpoint.sendMessages(params, function (err, data) {
    if (err) console.log(err);
    else ShowOutput(data);
  });
}

SendMessage()
