import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieInfo from "./MovieInfo/MovieInfo";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getMovie } from "../../../redux/actions/movies";
import styles from "./styles";
import { Button, Container, Grid, Modal, withStyles } from "@material-ui/core";
import {
  Find_cinema_booking,
  find_showtime,
  setSelectedCinema,
  setSelectedTime,
} from "../../../redux/actions/checkout";
import BookingForm from "./BookingForm/BookingForm";
import BookingSeats from "./BookingSeats/BookingSeats";
import BookingCheckout from "./BookingCheckout/BookingCheckout";
import { useTranslation } from "react-i18next";
import { SET_SELECTED_DATE } from "../../../redux/types/checkout";

BookingPage.propTypes = {};

function BookingPage(props) {
  const { classes } = props;
  const { t } = useTranslation();
  const movie = useSelector((state) => state.movieState.selectedMovie);
  const showInvitation = useSelector(
    (state) => state.checkoutState.showInvitation
  );
  const isAuthenticated = useSelector(
    (state) => state.authState.isAuthenticated
  );
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedTime = useSelector((state) => state.checkoutState.selectedTime);
  const selectedDate = useSelector((state) => state.checkoutState.selectedDate);
  useEffect(() => {
    dispatch(getMovie(params.id));
    //  dispatch(find_showtime({ movieId: params.id, selectedDate: selectedDate }));
    dispatch(Find_cinema_booking(params.id));
    return () => {
      dispatch(setSelectedCinema(""));
      dispatch(setSelectedTime(""));
      dispatch({
        type: SET_SELECTED_DATE,
        payload: null,
      });
    };
  }, []);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={2} style={{ height: "100%" }}>
        <MovieInfo movie={movie} />
        <Grid item lg={9} xs={12} md={12} style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
          <BookingForm></BookingForm>
          {selectedTime && (
            <>
              <BookingSeats></BookingSeats>
              <BookingCheckout></BookingCheckout>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default withStyles(styles)(BookingPage);
