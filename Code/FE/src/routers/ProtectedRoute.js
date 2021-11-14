import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProtectedRoute = ({
  layout: Layout,
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && user.role === "superadmin" ? (
        <Layout history={props.history}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user,
});
export default connect(mapStateToProps)(ProtectedRoute);
