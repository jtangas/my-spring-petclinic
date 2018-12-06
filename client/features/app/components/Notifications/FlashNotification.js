import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Transition } from 'semantic-ui-react';

import removeMessageAction from 'features/app/actions/ClearNotification';

class FlashNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ttl: 3000,
      visible: true,
    }
  }

  markDisplayed = () => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  componentDidMount() {
    this.markDisplayedTimeout = setTimeout(this.markDisplayed, this.state.ttl);
  }

  componentWillUnmount() {
    clearTimeout(this.markDisplayedTimeout);
  }

  render() {
    const { visible } = this.state;
    const { message, duration, animation, removeMessage } = this.props;
    const messageProps = (message.success) ? {positive: true} : {negative: true};

    return (
      <Transition visible={visible} duration={duration} animation={animation} onHide={() => removeMessage(message)} >
        <Message {...messageProps} floating style={{ width: '300px'}}>
          <Message.Header>{message.header}</Message.Header>
          <p>{message.message}</p>
        </Message>
      </Transition>
    )
  }
}

FlashNotification.defaultProps = {
  duration: 1000,
  animation: 'fade',
};


const mapDispatchToProps = {
  removeMessage: removeMessageAction,
};

export default connect(null, mapDispatchToProps)(FlashNotification);
