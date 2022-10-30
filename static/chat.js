"use strict";

/* detect url in a message and add a link tag */
const ws = new WebSocket("ws://localhost:8081");
function detectURL(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
  });
}

/* ========== */
/* Title component */
class Title extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convTitle"
    }, this.props.owner, "'s display");
  }
}
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }
  handleSendMessage(event) {
    event.preventDefault();
    /* Disable sendMessage if the message is empty */
    if (this.messageInput.value.length > 0) {
      this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
      /* Reset input after send*/
      this.messageInput.value = '';
    }
  }
  handleTyping(event) {
    /* Tell users when another user has at least started to write */
    if (this.messageInput.value.length > 0) {
      this.props.typing(this.ownerInput.value);
    } else {
      /* When there is no more character, the user no longer writes */
      this.props.resetTyping(this.ownerInput.value);
    }
  }
  render() {
    /* If the chatbox state is loading, loading class for display */
    var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
    let sendButtonIcon = /*#__PURE__*/React.createElement("i", {
      className: "material-icons"
    }, "send");
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSendMessage
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      ref: owner => this.ownerInput = owner,
      value: this.props.owner
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      ref: ownerAvatar => this.ownerAvatarInput = ownerAvatar,
      value: this.props.ownerAvatar
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      ref: message => this.messageInput = message,
      className: "chatApp__convInput",
      placeholder: "Text message",
      onKeyDown: this.handleTyping,
      onKeyUp: this.handleTyping,
      tabIndex: "0"
    }), /*#__PURE__*/React.createElement("div", {
      className: 'chatApp__convButton ' + loadingClass,
      onClick: this.handleSendMessage
    }, sendButtonIcon));
  }
}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let typersDisplay = '';
    let countTypers = 0;
    /* for each user writing messages in chatroom */
    for (var key in this.props.isTyping) {
      /* retrieve the name if it isn't the owner of the chatbox */
      if (key != this.props.owner && this.props.isTyping[key]) {
        typersDisplay += ', ' + key;
        countTypers++;
      }
    }
    /* formatting text */
    typersDisplay = typersDisplay.substr(1);
    typersDisplay += countTypers > 1 ? ' are ' : ' is ';
    /* if at least one other person writes */
    if (countTypers > 0) {
      return /*#__PURE__*/React.createElement("div", {
        className: "chatApp__convTyping"
      }, typersDisplay, " writing", /*#__PURE__*/React.createElement("span", {
        className: "chatApp__convTypingDot"
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convTyping"
    });
  }
}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convTimeline"
    }, this.props.messages.slice(0).reverse().map(messageItem => /*#__PURE__*/React.createElement(MessageItem, {
      key: messageItem.id,
      owner: this.props.owner,
      sender: messageItem.sender,
      senderAvatar: messageItem.senderAvatar,
      message: messageItem.message
    })));
  }
}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends React.Component {
  render() {
    /* message position formatting - right if I'm the author */
    let messagePosition = this.props.owner == this.props.sender ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left';
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convMessageItem " + messagePosition + " clearfix"
    }, /*#__PURE__*/React.createElement("img", {
      src: this.props.senderAvatar,
      alt: this.props.sender,
      className: "chatApp__convMessageAvatar"
    }), /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convMessageValue",
      dangerouslySetInnerHTML: {
        __html: this.props.message
      }
    }));
  }
}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
    var timeout = null;
  }
  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  sendMessageLoading(sender, senderAvatar, message) {
    this.setState({
      isLoading: true
    });
    this.props.sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 400);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__conv"
    }, /*#__PURE__*/React.createElement(Title, {
      owner: this.props.owner
    }), /*#__PURE__*/React.createElement(MessageList, {
      owner: this.props.owner,
      messages: this.props.messages
    }), /*#__PURE__*/React.createElement("div", {
      className: "chatApp__convSendMessage clearfix"
    }, /*#__PURE__*/React.createElement(TypingIndicator, {
      owner: this.props.owner,
      isTyping: this.props.isTyping
    }), /*#__PURE__*/React.createElement(InputMessage, {
      isLoading: this.state.isLoading,
      owner: this.props.owner,
      ownerAvatar: this.props.ownerAvatar,
      sendMessage: this.props.sendMessage,
      sendMessageLoading: this.sendMessageLoading,
      typing: this.props.typing,
      resetTyping: this.props.resetTyping
    })));
  }
}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      isTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typing = this.typing.bind(this);
    this.resetTyping = this.resetTyping.bind(this);
  }
  /* adds a new message to the chatroom */
  sendMessage(sender, senderAvatar, message) {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: this.state.messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat
      };
      this.setState({
        messages: [...this.state.messages, newMessageItem]
      });
      ws.send(JSON.stringify({
        value: JSON.stringify(newMessageItem),
        type: 'chat',
        Key: "727"
      }));
      this.resetTyping(sender);
    }, 400);
  }
  /* updates the writing indicator if not already displayed */
  typing(writer) {
    if (!this.state.isTyping[writer]) {
      let stateTyping = this.state.isTyping;
      stateTyping[writer] = true;
      this.setState({
        isTyping: stateTyping
      });
    }
  }
  /* hide the writing indicator */
  resetTyping(writer) {
    let stateTyping = this.state.isTyping;
    stateTyping[writer] = false;
    this.setState({
      isTyping: stateTyping
    });
  }
  render() {
    let users = {};
    let chatBoxes = [];
    let messages = this.state.messages;
    let isTyping = this.state.isTyping;
    let sendMessage = this.sendMessage;
    let typing = this.typing;
    let resetTyping = this.resetTyping;

    /* user details - can add as many users as desired */
    users[0] = {
      name: 'Shun',
      avatar: 'https://i.pravatar.cc/150?img=32'
    };
    users[1] = {
      name: 'Gabe',
      avatar: 'https://i.pravatar.cc/150?img=56'
    };
    /* test with two other users :)
    users[2] = { name: 'Kate', avatar: 'https://i.pravatar.cc/150?img=47' };
    users[3] = { name: 'Patrick', avatar: 'https://i.pravatar.cc/150?img=14' };
    */

    /* creation of a chatbox for each user present in the chatroom */
    Object.keys(users).map(function (key) {
      var user = users[key];
      chatBoxes.push( /*#__PURE__*/React.createElement(ChatBox, {
        key: key,
        owner: user.name,
        ownerAvatar: user.avatar,
        sendMessage: sendMessage,
        typing: typing,
        resetTyping: resetTyping,
        messages: messages,
        isTyping: isTyping
      }));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "chatApp__room"
    }, chatBoxes);
  }
}
/* end ChatRoom component */
/* ========== */

/* render the chatroom */
setTimeout(() => {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChatRoom, null), document.getElementById("chatApp"));
}, 400);

ws.onmessage = ({data}) => {
    if(JSON.parse(data).type == 'chat') {
      document.getElementById('chatbox').innerHTML += "<br>" + JSON.parse(data).value
      this.setState({
        messages: [...this.state.messages, newMessageItem]
      });
    }
};