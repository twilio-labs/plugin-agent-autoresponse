import React from 'react';
import { connect } from 'react-redux';
import { Actions, withTheme } from '@twilio/flex-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { CannedResponsesStyles } from './CannedResponses.Styles';

class CannedResponses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    Actions.invokeAction('SendMessage', {
      channelSid: this.props.channelSid,
      body: event.target.value
    });
  }

  render() {
    return (
      <CannedResponsesStyles>
        <FormControl className="form">
          <InputLabel className="input-label" htmlFor="response">Canned Responses</InputLabel>
          <Select
            value={this.state.response}
            onChange={this.handleChange}
            name="response"
          >
            <MenuItem value="This is my first canned response.">Canned Response 1</MenuItem>
            <MenuItem value="This is my second canned response.">Canned Response 2</MenuItem>
            <MenuItem value="This is my third canned response.">Canned Response 3</MenuItem>
          </Select>
        </FormControl>
      </CannedResponsesStyles>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  let currentTask = false;
  state.flex.worker.tasks.forEach((task) => {
    if (ownProps.channelSid === task.attributes.channelSid) {
      currentTask = task;
    }
  })

  return {
    state,
    currentTask,
  }
}

export default connect(mapStateToProps)(withTheme(CannedResponses));
