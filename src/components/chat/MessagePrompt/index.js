import React, { PropTypes } from 'react';

import connector from './connector';

class MessagePrompt extends React.Component {

  static propTypes = {
    message: PropTypes.string,
    onMessageChange: PropTypes.func.isRequired,
    onMessageSubmit: PropTypes.func.isRequired,
    currentRoomIsJoined: PropTypes.bool,
    currentRoomName: PropTypes.string,
  }

  static defaultProps = {
    message: '',
  }

  componentDidMount() {
    document.addEventListener("keydown", this.focusInput, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.focusInput, false);
  }

  focusInput = (e) => {
    const isSpecialKey = (
      e.ctrlKey || e.altKey || e.metaKey
      || e.key === 'Tab' || e.key === 'CapsLock' || e.key === 'Shift'
      || e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace'
    );
    if (!isSpecialKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      this.inputRef.focus();
    }
}


  onChange = (e) => {
    this.props.onMessageChange(e.target.value);
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const message = this.props.message.trim();
    if (message) {
      this.props.onMessageSubmit(message);
    }
  };

  getPlaceholder = () => {
    const { currentRoomName, currentRoomIsJoined } = this.props;
    const messageNoRoom = 'You should create and join a room to post messages';
    const messageRoomNotJoined = `You should join #${currentRoomName} to post messages on this room`;
    const messageRoomJoined = `Message #${currentRoomName}`;
    if (currentRoomIsJoined) {
      return messageRoomJoined;
    }
    if (!currentRoomName) {
      return messageNoRoom;
    }
    return messageRoomNotJoined;
  }

  render() {
    const { currentRoomIsJoined } = this.props;
    const disabled = !currentRoomIsJoined;
    const message = disabled ? '' : this.props.message;
    const placeholder = this.getPlaceholder();

    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={el => { this.inputRef = el; }}
            onChange={this.onChange}
            value={message}
            disabled={disabled}
            type="text"
            className="form-control"
            placeholder={placeholder}
          />
        </form>
      </div>
    );
  }
}

export default connector(MessagePrompt);
