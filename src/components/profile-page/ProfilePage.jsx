import React from "react";
import { connect } from "react-redux";
import { startUpdateGeneralInfo } from "../../actions/profile-page/generalInfoActions";
import GeneralInfoForm from "./GeneralInfoForm";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = updatedGeneralInfo => {
    this.props.startUpdateGeneralInfo(updatedGeneralInfo);
  };
  render() {
    return (
      <div>
        <GeneralInfoForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUpdateGeneralInfo: updatedGeneralInfo =>
    dispatch(startUpdateGeneralInfo(updatedGeneralInfo))
});
export default connect(
  null,
  mapDispatchToProps
)(ProfilePage);
