const state = {
  bits: 0,
  client: null,
  messages: [],
  subs: 0,
}

const start = async botOptions => {
  const tmi = require('tmi.js')

  // Set all of our options for tmi.js
  const options = {
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: 'fdgt-test',
      password: 'oauth:definitely-a-token',
    },
    channels: [botOptions.channel],
  }

  // If we're NOT in a production environment, connect to `fdgt`
  if (process.env.NODE_ENV !== 'production') {
    options.connection.server = 'irc.fdgt.dev'

    if (process.env.NODE_ENV !== 'test') {
      options.options = { debug: true }
    }
  }

  // Create the tmi.js client
  const client = state.client = new tmi.Client(options)

  // Set up event listeners
  client.on('cheer', (channel, userstate, message) => {
    state.bits += parseInt(userstate.bits, 10)
  })

  client.on('subscription', (channel, username, method, message, userstate) => {
    state.subs += 1
  })

  client.on('message', (channel, tags, message, self) => {
    if (!self) {
      state.messages.push(message)
    }
  })

  // Connect the client
  await client.connect()
}





module.exports = {
  start,
  state,
}
