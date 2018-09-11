import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { sendMessage } from '../../actions/chat/chat';
import moment from 'moment';

import MessageInput from './MessageInput';
import SingleMessage from './SingleMessage';
import { getMessagesFromChat, userLoggedIn } from '../../selectors/firebaseSelectors';

const MessageBoxContainer = styled.div`
	display: flex;
	flex: 0.8;
	flex-direction: column;
	height: 80vh;
	padding: 0 16px;
`;

const MessagesContainer = styled.div`
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
`;

class MessageBox extends React.Component {
	constructor(props) {
		super(props);

		this.emptyDivRef = React.createRef();
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom = () => {
		this.emptyDivRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	handleSend = (inputMessage) => {
		const { selectedChatId, currentUserId } = this.props;
		const message = {
			senderId: currentUserId,
			sentDate: moment.utc().format(),
			value: inputMessage
		};
		this.props.sendMessage(selectedChatId, currentUserId, message);
	};

	render() {
		const { messages, currentUserId } = this.props;
		return (
			<MessageBoxContainer>
				<MessagesContainer>
					{messages.map((message) => <SingleMessage message={message} currentUserId={currentUserId} />)}
					<div style={{ float: 'left', clear: 'both' }} ref={this.emptyDivRef} />
				</MessagesContainer>
				<MessageInput handleSend={this.handleSend} />
			</MessageBoxContainer>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	messages: getMessagesFromChat(ownProps.selectedChatId)(state),
	currentUserId: userLoggedIn(state)
});

const mapDispatchToProps = {
	sendMessage
};

const composer = compose(firebaseConnect([ 'users' ]), connect(mapStateToProps, mapDispatchToProps));

export default composer(MessageBox);
