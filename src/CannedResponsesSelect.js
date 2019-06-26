import React from 'react';
import { Actions, withTheme } from '@twilio/flex-ui';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class CannedResponsesSelect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      'response': ''
    }
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    Actions.invokeAction('SendMessage', {
      channelSid: this.props.channelSid,
      body: event.target.value
    });
  }

  render() {
    return (
      <FormControl style={{ marginBottom: '20px' }}>
        <InputLabel style={{ paddingLeft: '5px' }} htmlFor="response">Canned Responses</InputLabel>
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
    )
  }
};

export default withTheme(CannedResponsesSelect);
