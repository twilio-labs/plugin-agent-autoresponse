# Agent Auto-Response Plugin

This Twilio Flex Plugin enables your agents to send canned responses when chatting with a customer.

To learn more about developing plugins on your Flex instance, refer to the [getting started guide](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin).

---

There are two main files in this example:

```
src/AgentAutoResponsePlugin.js
src/components/CannedResponses.js
```

The main file is the `AgentAutoResponsePlugin.js` file, and contains many comments describing how the auto-response example is achieved. In addition, it appends the Canned Responses component in `CannedResponses.js` to Chat/SMS conversations.

While the canned-responses are static in this example, you might build on this example and call-out to your own server to retrieve your curated list of canned responses before rendering them in the Flex UI.

---

When you run this plugin - you'll see a pre-defined message sent by the answering agent as soon as they accept the task.

Additionally, you'll see new UI added below the Chat Input field which is a Select menu and will let you select from a list of pre-defined canned responses. When selecting any message in the select menu - it will automatically be sent into the chat/sms channel.

## Screenshot

![Screenshot](https://indigo-bombay-5783.twil.io/assets/auto-response-canned.png)

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards install the dependencies by running `npm install`:

```bash
cd plugin-agent-autoresponse

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3001 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

When you are ready to deploy your plugin, in your terminal run:

```bash
npm run deploy
```

This will publish your plugin as a Private Asset that is accessible by the Functions & Assets API. If you want to deploy your plugin as a Public Asset, you may pass --public to your deploy command:

```bash
npm run deploy --public
```

For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.
