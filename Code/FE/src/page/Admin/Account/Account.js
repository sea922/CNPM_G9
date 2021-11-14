import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/actions/account";
import AccountProfile from "./components/AccountProfile/AccountProfile";
import AccountDetail from "./components/AccountDetail/AccountDetail";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
});

function Account(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item lg={5} md={6} xl={4} xs={12}>
          <AccountProfile />
        </Grid>
        <Grid item lg={7} md={6} xl={8} xs={12}>
          <AccountDetail  />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Account);
