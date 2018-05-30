export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "guesswholunch"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://tmr9933w85.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_vAVl4tg6L",
    APP_CLIENT_ID: "275f996ftv9o5g3ddodrb4gbml",
    IDENTITY_POOL_ID: "us-west-2:79a752cd-ad84-4b87-86e8-c6088a9df4da"
  }
};