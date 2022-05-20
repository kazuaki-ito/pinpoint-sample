import AWS from 'aws-sdk'
import 'dotenv/config'

const awsRegion: string = process.env.AWS_REGION || ''
const awsAccessKeyId: string = process.env.AWS_ACCESS_KEY_ID || ''
const awsSecretKey: string = process.env.AWS_SECRET_KEY || ''
const senderAddress: string = process.env.FROM_ADDR || ''
const toAddress: string = process.env.TO_ADDR || ''
const appId: string = process.env.PINPOINT_PROJECT_ID || ''

const subject = "タイトル"

const bodyText = `本文
行1
行2`

const bodyHtml = `<html>
<head></head>
<body>
  <h1>タイトル</h1>
  <p>本文
    <a href='https://aws.amazon.com/pinpoint/'>the Amazon Pinpoint API</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`

const charset = "UTF-8"

// Specify the region.
AWS.config.update({
  credentials: new AWS.Credentials(
    awsAccessKeyId,
    awsSecretKey
  ),
  region: awsRegion
})

//Create a new Pinpoint object.
const pinpoint = new AWS.Pinpoint()

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
}


console.info('sendingMessages')
pinpoint.sendMessages(params, function (err, data) {
  console.info('sentMessage')
  if (err) {
    console.error(err)
  } else {
    console.info(data)
  }
})
