// Module imports
// import { parse as parseIRCMessage } from 'irc-message'
const { spy } = require('sinon')
const { expect } = require('chai')
const EventEmitter = require('events')
const tmi = require('tmi.js')





// Local imports
const {
  start,
  state,
} = require('../bot')





// Local constants
const defaultState = { ...state }
const testChannelName = 'TestChannel'
const wsSocket = class extends EventEmitter {
	send = () => {}
	terminate = () => {}
}





describe('Bot', function() {
  beforeEach(async () => {
    await start({ channel: testChannelName })
  })

  afterEach(async () => {
    // Tear down event listeners
    state.client.removeAllListeners()

    // Disconnect the client
    state.client.disconnect()

    // Reconnect the client
    Object.keys(state).forEach(key => state[key] = defaultState[key])
  })

  describe('default state', () => {
    it('should have a bits counter starting at zero', () => {
      expect(state.bits).to.equal(0)
    })

    it('should have an empty messages array', () => {
      expect(state.messages).to.have.length(0)
    })

    it('should have a subs counter starting at zero', () => {
      expect(state.subs).to.equal(0)
    })
  })

  describe('start', () => {
    it('should start the bot', () => {
      expect(state.client).to.be.instanceof(tmi.Client)
    })
  })

  describe('subs', () => {
    it('should update the state when there\'s a new subscription', done => {
      state.client.on('subscription', () => {
        expect(state.subs).to.equal(1)
        done()
      })
      state.client.say(testChannelName, 'subscription')
    })
  })

  describe('cheers', () => {
    it('should update the state when bits are sent', done => {
      state.client.on('cheer', (channel, userstate) => {
        expect(state.bits).to.equal(100000)
        done()
      })
      state.client.say(testChannelName, 'bits --bitscount 100000')
    })
	})

	describe('messages', () => {
		it('should update the state when messages are received', done => {
			state.client.on('message', (channel, tags, message, self) => {
				expect(state.messages[0]).to.equal(message)
				done()
			})
			state.client.say(testChannelName, 'foo')
		})
	})
})
