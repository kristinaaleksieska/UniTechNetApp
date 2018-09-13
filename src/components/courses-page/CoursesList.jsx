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
	padding-right: 8px;
	margin-top: 35px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
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
						placeholder="Search courses"
					/>
				</SearchContainer>
				<ThreeCardsContainer>
					{courses.length === 0 ? (
						<p>No courses</p>
					) : (
						courses
							.filter((course) =>
								course.name.toLowerCase().includes(this.state.searchField.toLowerCase())
							)
							.map((course) => <CourseListItem key={course.id} {...course} id={course.id} />)
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
