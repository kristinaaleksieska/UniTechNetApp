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

	static getDerivedStateFromProps(nextProps, prevState) {
		const { connectionId } = nextProps.match.params;
		if (connectionId && prevState.selectedChat !== connectionId) {
			nextProps.initializeChat(connectionId);
		}
		return {
			selectedChat: connectionId
		};
	}

	onConnectionClick = (connectionId) => {
		this.props.history.push(`/messenger/${connectionId}`);
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
