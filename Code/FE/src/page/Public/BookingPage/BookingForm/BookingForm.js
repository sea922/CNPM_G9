import React, { useEffect, useState } from "react";
import { Grid, Box, TextField, MenuItem, Typography } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  find_reservations,
  find_showtime_for_booking,
  setSelectedCinema,
  setSelectedSeats,
  setSelectedTime,
} from "../../../../redux/actions/checkout";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BookingForm(props) {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const showtimes = useSelector((state) => state.checkoutState.showtimes);
  const selectedCinema = useSelector(
    (state) => state.checkoutState.selectedCinema
  );
  const selectedDate = useSelector((state) => state.checkoutState.selectedDate);
  const selectedTime = useSelector((state) => state.checkoutState.selectedTime);
  const params = useParams();
  const cinemas = useSelector((state) => state.checkoutState.cinemas);
  const onChangeCinema = (e) => {
    dispatch(setSelectedCinema(e.target.value));
    if (selectedDate) {
      dispatch(
        find_showtime_for_booking(selectedDate, params.id, e.target.value)
      );
    }
  };

  const findShowtime = (date) => {
    dispatch(find_showtime_for_booking(date, params.id, selectedCinema._id)); // find showtime
  };

  const onChangeTime = (e) => {
    dispatch(setSelectedTime(e.target.value));
   
  };
  useEffect(() => {
    if (selectedTime) {
      let dataFind = {
        startAt: selectedTime,
        date: selectedDate,
        movieId: params.id,
        cinemaId: selectedCinema._id,
      };
      dispatch(find_reservations(dataFind));
    }
  }, [selectedTime]);
  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography align="center" variant="h2" color="inherit">
          {t("booking.nocinema")}
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm>
        <TextField
          fullWidth
          select
          value={selectedCinema}
          label={t("booking.selectCinema")}
          variant="outlined"
          onChange={onChangeCinema}
        >
          {cinemas.map((cinema) => (
            <MenuItem key={cinema._id} value={cinema}>
              {cinema.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {selectedCinema && (
        <Grid item xs={12} sm>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label={t("booking.date")}
              minDate={new Date()}
              value={selectedDate}
              onChange={(date) => findShowtime(date._d)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs={12} sm>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label={t("booking.time")}
            variant="outlined"
            onChange={onChangeTime}
          >
            {showtimes.map((showtime, index) => (
              <MenuItem key={index} value={showtime.startAt}>
                {showtime.startAt}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
