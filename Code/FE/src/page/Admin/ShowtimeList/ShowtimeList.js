import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import ShowtimeToolbar from "./components/ShowtimeToolbar/ShowtimeToolbar";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../../redux/actions/cinemas";
import { getMovies } from "../../../redux/actions/movies";
import { onSelectShowtime } from "../../../redux/actions/showtime";
import ShowtimeTable from "./components/ShowtimeTable/ShowtimeTable";
import ResponsiveDialog from "../../../components/ReponsiveDialog/ReponsiveDialog";
import AddShowtime from "./components/AddShowtime/AddShowtime";

ShowtimeList.propTypes = {};

function ShowtimeList(props) {
  const dispatch = useDispatch();
  const selectedShowtime = useSelector(
    (state) => state.showtimeState.selectedShowtime
  );
  useEffect(() => {
    dispatch(getCinemas());
    dispatch(getMovies());
  }, []);
  return (
    <div>
      <ShowtimeToolbar></ShowtimeToolbar>
      <ShowtimeTable></ShowtimeTable>
      <ResponsiveDialog
        open={Boolean(selectedShowtime)}
        handleClose={() => dispatch(onSelectShowtime(null))}
      >
        <AddShowtime></AddShowtime>
      </ResponsiveDialog>
    </div>
  );
}

export default withStyles(styles)(ShowtimeList);
