import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Connections from './Connections';
import MessageBox from './MessageBox';

import { initializeChat } from '../../actions/chat/chat';

const MessengerContainer = styled.div`
	margin-top: 25px;
	display: flex;
	justify-content: space-between;
`;

class Messenger extends React.Component {
	state = {
		selectedChat: null
	};

	render() {
		return null;
	}

	onConnectionClick = (connectionId) => {
		this.setState(
			{
				selectedChat: connectionId
			},
			() => {
				this.props.initializeChat(this.state.selectedChat);
			}
		);
	};

	render() {
		return (
			<MessengerContainer>
				<MessageBox selectedChatId={this.state.selectedChat} />
				<Connections selectedChatId={this.state.selectedChat} onConnectionClick={this.onConnectionClick} />
			</MessengerContainer>
		);
	}
}

const mapDispatchToProps = {
	initializeChat
};

export default connect(null, mapDispatchToProps)(Messenger);
