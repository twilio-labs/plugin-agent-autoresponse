import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CannedResponses from './components/CannedResponses';

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

    flex.MessageInput.Content.add(<CannedResponses key="canned-responses" />);


    manager.chatClient.on('channelJoined', (payload) => {
      // define a message to send into the channel - alternatively you could look it up here

      let body = `Hi! I'm ${manager.workerClient.attributes.full_name} and this is our predefined message.`;

      flex.Actions.invokeAction('SendMessage', {
        channelSid: payload.sid,
        body: body
      });
    });
  }
}
