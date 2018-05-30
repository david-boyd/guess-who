export function handler(event, context, callback) {

  console.log('context.clientContext',context.clientContext)
  if (context.clientContext) {
    console.log('context.clientContext.user', context.clientContext.user)
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!"  })
  })
}
