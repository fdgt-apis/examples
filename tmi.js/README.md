# `tmi.js` + `fdgt`

The bot in this repo is designed to use `fdgt` unless the `NODE_ENV` environment variable is set to `production`. It maintains a simple state option and tracks bits, subscriptions, and messages.

## Running the bot

1. Install dependencies
    ```bash
    $ yarn install
    # or
    $ npm install
    ```

1. Run the bot
    ```bash
    $ yarn dev
    # or
    $ npm dev
    ```

## Running the tests

This bot has a basic set of tests that can be run by the Mocha testing framework. Once dependencies have been installed, the tests can be run with
```bash
$ yarn test
# or
$ npm test
```
