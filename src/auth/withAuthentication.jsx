import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { isFirebaseUserLoggedIn } from "../selectors/firebaseSelectors";

export default WrappedComponent => {
  const Authorization = ({ isLoggedIn, ...props }) =>
    isLoggedIn ? <WrappedComponent {...props} /> : <Redirect to="/login" />;

  const mapStateToProps = state => ({
    isLoggedIn: isFirebaseUserLoggedIn(state)
  });

  return connect(mapStateToProps)(Authorization);
};
