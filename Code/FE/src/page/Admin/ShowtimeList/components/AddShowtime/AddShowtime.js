import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { Button, MenuItem, TextField, withStyles } from "@material-ui/core";
import styles from "./styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  addShowtime,
  updateShowtime,
} from "../../../../../redux/actions/showtime";
AddShowtime.propTypes = {};

function AddShowtime(props) {
  const selectedShowtime = useSelector(
    (state) => state.showtimeState.selectedShowtime
  );
  const { t } = useTranslation();
  const submitButton = selectedShowtime
    ? t("admin.showtimes.update")
    : t("admin.showtimes.add");
  const cinemas = useSelector((state) => state.cinemaState.cinemas);
  const movieState = useSelector((state) => state.movieState);
  const dispatch = useDispatch();
  const { classes } = props;
  return (
    <div>
      <Formik
        initialValues={{
          startAt: selectedShowtime ? selectedShowtime.startAt : "",
          movieId: selectedShowtime ? selectedShowtime.movieId._id : "",
          cinemaId: selectedShowtime ? selectedShowtime.cinemaId._id : "",
          startDate: selectedShowtime
            ? new Date(selectedShowtime.startDate)
            : new Date(),
          endDate: selectedShowtime
            ? new Date(selectedShowtime.endDate)
            : new Date(),
        }}
        validationSchema={Yup.object().shape({
          startAt: Yup.string().required(t("admin.showtimes.requiredTime")),
          movieId: Yup.string().required(t("admin.showtimes.requiredMovie")),
          cinemaId: Yup.string().required(t("admin.showtimes.requiredCinema")),
        })}
        onSubmit={(values) => {
          let startDate = moment(values.startDate).startOf("day")._d;
          let endDate = moment(values.endDate).endOf("day")._d;
          if (!selectedShowtime)
            dispatch(
              addShowtime({ ...values, startDate: startDate, endDate: endDate })
            );
          else {
            dispatch(
              updateShowtime(
                { ...values, startDate: startDate, endDate: endDate },
                selectedShowtime._id
              )
            );
          }
        }}
      >
        {(props) => {
          console.log(props.values);
          return (
            <Form>
              <div className={classes.field}>
                <TextField
                  error={
                    props.errors.startAt && props.touched.startAt ? true : false
                  }
                  helperText={
                    props.errors.startAt && props.touched.startAt
                      ? props.errors.startAt
                      : ""
                  }
                  fullWidth
                  select
                  className={classes.textField}
                  label={t("admin.showtimes.time")}
                  margin="dense"
                  name="startAt"
                  required
                  value={props.values.startAt}
                  variant="outlined"
                  onChange={(event) =>
                    props.setFieldValue("startAt", event.target.value)
                  }
                >
                  {["18:00", "19:00", "20:00", "21:00", " 22:00", "23:00"].map(
                    (time) => (
                      <MenuItem key={`time-${time}`} value={time}>
                        {time}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </div>
              <div className={classes.field}>
                <TextField
                  error={
                    props.errors.movieId && props.touched.movieId ? true : false
                  }
                  helperText={
                    props.errors.movieId && props.touched.movieId
                      ? props.errors.movieId
                      : ""
                  }
                  fullWidth
                  select
                  className={classes.textField}
                  label={t("admin.showtimes.movie")}
                  margin="dense"
                  name="movieId"
                  required
                  value={props.values.movieId}
                  variant="outlined"
                  onChange={(event) =>
                    props.setFieldValue("movieId", event.target.value)
                  }
                >
                  {movieState.nowShowing.map((movie) => (
                    <MenuItem key={movie._id} value={movie._id}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={
                    props.errors.cinemaId && props.touched.cinemaId
                      ? true
                      : false
                  }
                  helperText={
                    props.errors.cinemaId && props.touched.cinemaId
                      ? props.errors.cinemaId
                      : ""
                  }
                  fullWidth
                  select
                  className={classes.textField}
                  label={t("admin.showtimes.cinema")}
                  margin="dense"
                  name="cinemaId"
                  required
                  value={props.values.cinemaId}
                  variant="outlined"
                  onChange={(event) =>
                    props.setFieldValue("cinemaId", event.target.value)
                  }
                >
                  {cinemas.map((cinema) => (
                    <MenuItem key={cinema._id} value={cinema._id}>
                      {cinema.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={classes.field}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    inputVariant="outlined"
                    margin="normal"
                    name="startDate"
                    id="start-date"
                    label={t("admin.showtimes.startDate")}
                 
                    value={props.values.startDate}
                    onChange={(date) =>
                      props.setFieldValue("startDate", date._d)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />

                  <KeyboardDatePicker
                    className={classes.textField}
                    inputVariant="outlined"
                    margin="normal"
                    id="end-date"
                    label={t("admin.showtimes.endDate")}
                    name="endDate"
                  
                    value={props.values.endDate}
                    onChange={(date) => props.setFieldValue("endDate", date._d)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <Button
                className={classes.buttonFooter}
                color="primary"
                variant="contained"
                type="submit"
              >
                {submitButton}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default withStyles(styles)(AddShowtime);
