import React from 'react';
import styled from 'styled-components';
import Loading from '../../../common/Loading';
import E from './AddExperience';
import {
  updateExperience,
  removeExperience
} from '../../../../actions/profile-page/experienceActions';
import { userLoggedIn } from '../../../../selectors/firebaseSelectors';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const present = 'PRESENT';

const EditIcon = <Edit />;

const DeleteIcon = <Delete />;

const ExperienceContainer = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38);
`;

const ExperienceWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

class UserExperience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
      experience: props.experience
    };
  }

  onValueChangeee = e => {
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.id]: e.target.value
      }
    });
    console.log('triggered')
  };

  EditExperience = () => {
    const { uid } = this.props;
    this.props.updateExperience(uid, {...this.state.experience});

    this.setState({ editable: false });
  };

  render() {
    const { experience, editable } = this.state;
    const { uid } = this.props;

    if (!experience) return <Loading />;

    return (
      <ExperienceContainer>
        {editable ? (
          <E
            experience={experience}
            handleAction={this.EditExperience}
            onValueChange={this.onValueChangeee}
          />
        ) : (
          <ExperienceWrapper>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <Typography variant="title">{experience.jobTitle}</Typography>
              <InfoContainer>
                <Typography variant="subheading">
                  {experience.company}
                </Typography>
                <Typography variant="caption">
                  {experience.startDate} -{' '}
                  {experience.endDate ? experience.endDate : present}
                </Typography>
              </InfoContainer>
            </div>
            <ButtonContainer>
              <Button
                onClick={() => this.setState({ editable: true })}
                variant="flat"
              >
                {EditIcon}
              </Button>
              <Button
                onClick={() => this.props.removeExperience(uid, experience.id)}
                variant="flat"
                color="primary"
              >
                {DeleteIcon}
              </Button>
            </ButtonContainer>
          </ExperienceWrapper>
        )}
      </ExperienceContainer>
    );
  }
}

const mapDispatchToProps = {
  updateExperience,
  removeExperience
};

const mapStateToProps = state => ({
  uid: userLoggedIn(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserExperience);
