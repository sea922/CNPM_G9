import { Grid, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../../redux/actions/cinemas";
import { getMovies } from "../../../redux/actions/movies";
import { Get_checkin_reservation, Get_uncheck_reservation } from "../../../redux/actions/reservation";
import { getUsers } from "../../../redux/actions/user";
import TotalCinemas from "./components/TotalCinemas/TotalCinemas";
import TotalMovies from "./components/TotalMovies/TotalMovies";
import TotalReservations from "./components/TotalReservations/TotaoReservations";
import TotalUsers from "./components/TotalUsers/TotalUsers";
const styles = (theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
});

function Dashboard(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userState.users);
  const movies = useSelector((state) => state.movieState.movies);
  const cinemas = useSelector((state) => state.cinemaState.cinemas);
  const reservationChecked = useSelector((state)=> state.reservationState.reservationChecked)
  const reservationUncheck = useSelector((state)=> state.reservationState.reservationUncheck)
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMovies());
    dispatch(getCinemas());
    dispatch(Get_uncheck_reservation());
    dispatch(Get_checkin_reservation());
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers users={users.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalCinemas cinemas={cinemas.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalMovies movies={movies.length} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalReservations reservations={reservationUncheck.length + reservationChecked.length} />
        </Grid>
        {/* <Grid item lg={8} md={12} xl={9} xs={12}>
          <BestMovies
            bestMovies={this.getBestMovies(reservations, movies, 5)}
          />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Dashboard);
