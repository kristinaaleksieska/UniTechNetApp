import React from 'react';
import {getAllCourses} from '../../selectors/firebaseSelectors';
import { mapFirebaseCoursesToArray, mapFirebaseProblemsToArray } from '../../mappings-from-firebase/MappingsFromFirebase';
import { getCurrentUserDetails } from '../../selectors/firebaseSelectors';
import Loading from '../common/Loading';
import Problem from './problems/Problem';
import {connect} from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';

const ProblemsContainer = styled.div`
    display: flex;
    padding-top: 20px;
    justify-content: center;
`
const CourseContainer = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    padding-top: 30px;
`
const CenteredDiv = styled.div`
    align-self: center;
`

class Course extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            isSubscribed: false,
        }
    }

    render() {
        const {courses} = this.props;

        if (!courses) {
            return <Loading />;
        } 

        const course = mapFirebaseCoursesToArray(courses).find(course => course.id === this.props.match.params.id);
        const userCourse = mapFirebaseCoursesToArray(this.props.currentUser.courses).find(uCourse => uCourse.id === course.id);
        const courseProblems = mapFirebaseProblemsToArray(course.problems);
        console.log(courseProblems)
        return (
            <CourseContainer>
            <CenteredDiv> <h2>{course.name}</h2></CenteredDiv>
            
                <ProblemsContainer>
                    {courseProblems.map(courseProblem => <Problem key = {courseProblem.id} id = {courseProblem.id} {...courseProblem} />)}    
                </ProblemsContainer>
            </CourseContainer>
        );
    }
}

const mapStateToProps = state => ({
    courses: getAllCourses(state),
    currentUser: getCurrentUserDetails(state)
});

export default compose(
    firebaseConnect(['courses', 'users']),
    connect(mapStateToProps)
)(Course);