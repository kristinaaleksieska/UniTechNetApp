import React from 'react';
import { Link } from 'react-router-dom';

const CourseListItem = props => (
  <div>
    <Link to={`/courses/${props.id}`}>
      <div>
        <h4>{props.name}</h4>
        <h6>{props.description}</h6>
      </div>
    </Link>
  </div>
);

export default CourseListItem;
