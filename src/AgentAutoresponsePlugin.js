import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CannedResponsesSelect from './components/CannedResponsesSelect';

const PLUGIN_NAME = 'AgentAutoresponsePlugin';

export default class AgentAutoresponsePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    flex.MessageInput.Content.add(<CannedResponsesSelect key="canned-responses" />);

    // Listen for Tasks Accepted
    flex.Actions.addListener("afterAcceptTask", (payload) => {
      if (!flex.TaskHelper.isChatBasedTask(payload.task)) {
        return;
      }

      // Once the task is accepted, it takes time to boot the Chat SDK
      // Polling and checking for the channel is a way to ensure the
      // the channel is ready to go before attempting to send in our first message
      let channelPromise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          let channelSid = payload.task.attributes.channelSid;
          let channel = manager.store.getState().flex.chat.channels[channelSid];
          if (undefined !== channel && undefined !== channel.source) {
            clearInterval(interval);
            resolve(channel.source);
          }
        }, 250)
      });

      // once the channel is fully booted
      channelPromise.then(channel => {
        // define a message to send into the channel - alternatively you could look it up here
        let body = `Hi! I'm ${manager.workerClient.attributes.full_name} and this is our predefined message.`;

        flex.Actions.invokeAction('SendMessage', {
          channelSid: payload.task.attributes.channelSid,
          body: body
        });
      })
    })
  }
}
