import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import Connection from './Connection';

import { getConnectionsForUser } from '../../selectors/firebaseSelectors';

const ConnectionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0.2;
	justify-content: flex-start;
	overflow-y: ${ifProp('withOverflow', 'scroll', 'hidden')};
`;

const StyledConnection = styled(Connection)`
	cursor: pointer;

	background: ${ifProp('isSelected', 'rgba(244, 67, 54, 0.25) !important')};
	
	@keyframes highlight {
		from { background: transparent };
		to { background: rgba(244, 67, 45, 0.25) };
	}

	&:hover {
		animation-name: highlight;
		animation-duration: 0.5s;
		background: rgba(244, 67, 45, 0.25);
	}
`;

const Connections = (props) => {
	const { connections, onConnectionClick, selectedChatId, className } = props;
	if (!connections) {
		return null;
	}

	return (
		<ConnectionsContainer withOverflow={connections.length > 6}>
			{connections &&
				connections.map((connection) => (
					<StyledConnection
						key={connection.id}
						isSelected={selectedChatId === connection.id}
						onClick={onConnectionClick}
						connection={connection}
					/>
				))}
		</ConnectionsContainer>
	);
};

const mapStateToProps = (state) => ({
	connections: getConnectionsForUser(state)
});

const composer = compose(firebaseConnect([ 'users' ]), connect(mapStateToProps));

export default composer(Connections);
