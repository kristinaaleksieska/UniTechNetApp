import React from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Button from '@material-ui/core/Button';

import theme from '../../theme/theme';

const MessageContainer = styled.div`
	${ifProp('isSame', css`margin-left: auto;`, css`margin-right: auto;`)} display: inline-block;
	margin-top: 8px;
`;

const Message = styled.div`
	background: ${ifProp('isSame', theme.colors.primary, '#BDBDBD')};
	color: ${ifProp('isSame', '#fff', 'rgba(0, 0, 0, 0.87)')};
	padding: 8px;
	border-radius: 16px;
`;

const SingleMessage = (props) => {
	const { message, currentUserId } = props;
	if (!message || !currentUserId) {
		return null;
	}

	const isSenderSameAsCurrentUser = currentUserId === message.senderId;

	const buttonColor = isSenderSameAsCurrentUser ? 'primary' : 'default';

	return (
		<MessageContainer isSame={isSenderSameAsCurrentUser}>
			<Message isSame={isSenderSameAsCurrentUser}>{message.value}</Message>
		</MessageContainer>
	);
};

export default SingleMessage;
