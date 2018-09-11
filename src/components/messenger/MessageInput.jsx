import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { prop } from 'styled-tools';

const SendIcon = <Send />;
const MessageInputContainer = styled.div`
	display: flex;
	align-self: flex-end;
	height: ${prop('lines') * 36}px;
	max-height: ${2 * 36}px;
	width: 100%;
`;

class MessageInput extends React.Component {
	state = {
		message: ''
	};

	onValueChange = (e) => {
		this.setState({
			message: e.target.value
		});
	};

	handleSend = () => {
		const { message } = this.state;
		this.props.handleSend(message);
		this.setState({
			message: ''
		});
	};

	render() {
		const rowCount = this.state.message.split('\n').length;

		return (
			<MessageInputContainer lines={rowCount}>
				<TextField
					rows={rowCount}
					value={this.state.message}
					onChange={this.onValueChange}
					autoFocus
					fullWidth
					multiline
				/>
				<Button variant="flat" onClick={this.handleSend}>
					{SendIcon}
				</Button>
			</MessageInputContainer>
		);
	}
}

export default MessageInput;
