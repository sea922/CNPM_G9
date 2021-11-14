import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import CinemaToolbar from "./components/CinemaToolbar/CinemaToolbar";
import {
  getCinemas,
  onSelectCinema,
  searchFullTextCinema,
} from "../../../redux/actions/cinemas";
import CinemaCard from "../../../components/CinemaCard/CinemaCard";
import ResponsiveDialog from "../../../components/ReponsiveDialog/ReponsiveDialog";
import AddCinema from "./components/AddCinema/AddCinema";
CinemaList.propTypes = {};

function CinemaList(props) {
  const { classes } = props;
  const [search, setSearch] = useState("");
  const cinemas = useSelector((state) => state.cinemaState.cinemas);
  const selectedCinema = useSelector(
    (state) => state.cinemaState.selectedCinema
  );
  useEffect(() => {
    if (search == "") {
      dispatch(getCinemas());
    } else {
      dispatch(searchFullTextCinema(search));
    }
  }, [search]);
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <CinemaToolbar
        search={search}
        onChangeSearch={(e) => setSearch(e.target.value)}
      />
      <div className={classes.content}>
        {cinemas.length === 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={3}>
            {cinemas.map((cinema) => (
              <Grid
                item
                key={cinema._id}
                lg={4}
                md={6}
                xs={12}
                onClick={() => dispatch(onSelectCinema(cinema))}
              >
                <CinemaCard cinema={cinema} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <ResponsiveDialog
        id="Edit-movie"
        open={Boolean(selectedCinema)}
        handleClose={() => dispatch(onSelectCinema(null))}
      >
        <AddCinema />
      </ResponsiveDialog>
    </div>
  );
}

export default withStyles(styles)(CinemaList);
