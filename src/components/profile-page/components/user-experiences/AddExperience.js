import React from 'react';
import { connect } from 'react-redux';
import ExperienceForm from './ExperienceForm';
import Button from '@material-ui/core/Button';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { addExperience } from '../../../../actions/profile-page/experienceActions';
import CardActions from '@material-ui/core/CardActions';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38);
  padding-right: 15px;
`;

class AddExperience extends React.Component {
  state = {
    addable: false
  };

  addExperience = experience => {
    this.props.addExperience(this.props.uid, experience);
    this.setState({ addable: false });
  };

  render() {
    const { addable } = this.state;
    return (
      <ExperienceContainer>
        {addable ? (
          <ExperienceForm handleAction={this.addExperience} />
        ) : (
          <CardActions>
            <Button
              color="primary"
              variant="flat"
              onClick={() => this.setState({ addable: true })}
            >
              ADD EXPERIENCE
            </Button>
          </CardActions>
        )}
      </ExperienceContainer>
    );
  }
}

const mapStateToProps = state => ({
  uid: userLoggedIn(state)
});

const mapDispatchToProps = {
  addExperience
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperience);
