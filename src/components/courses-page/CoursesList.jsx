import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CourseListItem from './CourseListItem';
import Loading from '../common/CustomDatePicker';
import Input from '@material-ui/core/Input';
import { getAllCoursesAsArray } from '../../selectors/firebaseSelectors';
import styled from 'styled-components';

const ThreeCardsContainer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-flow: wrap;
`;

const SearchContainer = styled.div`
	margin-top: 35px;
	display: flex;
	width: 40%;
	margin: 0 auto;
`;

class CourseList extends React.Component {
	state = {
		searchField: ''
	};

	onInputChange = (e) => {
		this.setState({
			searchField: e.target.value
		});
	};

	render() {
		const { courses } = this.props;
		if (!courses) {
			return <Loading />;
		}

		return (
			<div>
				<SearchContainer>
					<Input
						value={this.state.searchField}
						onChange={this.onInputChange}
						autoFocus
						fullWidth
						placeholder="Search Field"
					/>
				</SearchContainer>
				<ThreeCardsContainer>
					{courses.length === 0 ? (
						<p>No courses</p>
					) : (
						courses.map(
							(course) =>
								course.name.includes(this.state.searchField) && (
									<CourseListItem key={course.id} {...course} id={course.id} />
								)
						)
					)}
				</ThreeCardsContainer>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	courses: getAllCoursesAsArray(state)
});

export default compose(firebaseConnect([ 'courses' ]), connect(mapStateToProps))(CourseList);
