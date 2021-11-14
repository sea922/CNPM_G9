import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { Button, TextField, withStyles } from "@material-ui/core";
import { setAlert } from "../../../../../redux/actions/alert";
import * as Yup from "yup";
import FileUpload from "../../../../../components/FileUpload/FileUpload";
import {
  createCinemas,
  removeCinemas,
  updateCinemas,
} from "../../../../../redux/actions/cinemas";
import { useTranslation } from "react-i18next";
AddCinema.propTypes = {};

function AddCinema(props) {
  const { classes } = props;
  const selectedCinema = useSelector(
    (state) => state.cinemaState.selectedCinema
  );
  const { t } = useTranslation();
  const submitButton = selectedCinema
    ? t("admin.cinemas.update")
    : t("admin.cinemas.add");
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedCinema) {
      setSeats(selectedCinema.seats);
    }
  }, [selectedCinema]);

  const handleSeatsChange = (index, value) => {
    if (value > 10) return dispatch(setAlert("Values <= 10", "error", 2000));
    seats[index] = Array.from({ length: value }, () => 0);
    setSeats([...seats]);
  };
  const onAddSeatRow = () => {
    let temp = [...seats, []]; // them cho ngoi
    setSeats(temp);
  };
  const onRemoveRow = (index) => {
    let temp = [...seats];
    if (temp.length >= 1) temp.splice(index, 1);
    setSeats([...temp]);
  };
  const handleRenderSeatsField = () => {
    if (seats)
      return seats.map((seat, index) => {
        return (
          <div key={`seat-${index}-${seat.length}`} className={classes.field}>
            <TextField
              key={`new-seat-${index}`}
              className={classes.textField}
              label={
                t("admin.cinemas.seatsOfRow") +
                (index + 10).toString(36).toUpperCase()
              }
              margin="dense"
              required
              value={seat.length}
              variant="outlined"
              type="number"
              onChange={(event) => handleSeatsChange(index, event.target.value)}
            />
            <Button onClick={() => onRemoveRow(index)}>
              {t("admin.cinemas.remove")}
            </Button>
          </div>
        );
      });
    else return null;
  };
  return (
    <div>
      <Formik
        initialValues={{
          image: null,
          name: selectedCinema ? selectedCinema.name : "",
          city: selectedCinema ? selectedCinema.city : "",
          ticketPrice: selectedCinema ? selectedCinema.ticketPrice : 0,
          seatsAvailable: selectedCinema ? selectedCinema.seatsAvailable : 0,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(`${t("admin.cinemas.requiredName")}`),
          city: Yup.string().required(t("admin.cinemas.requiredCity")),
          ticketPrice: Yup.number().required(
            t("admin.cinemas.requiredTicketPrice")
          ),
          seatsAvailable: Yup.number().required(
            t("admin.cinemas.requireSeatsAvailable")
          ),
        })}
        onSubmit={(values) => {
          const { image, ...rest } = values;
          const cinema = { ...rest, seats: seats };
          if (!selectedCinema) dispatch(createCinemas(image, cinema));
          else {
            dispatch(updateCinemas(image, cinema, selectedCinema._id));
          }
        }}
      >
        {(props) => {
          return (
            <Fragment>
              <Form>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    error={
                      props.errors.name && props.touched.name ? true : false
                    }
                    helperText={
                      props.errors.name && props.touched.name
                        ? props.errors.name
                        : ""
                    }
                    label={t("admin.cinemas.name")}
                    margin="dense"
                    name="name"
                    required
                    value={props.values.name}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <TextField
                    fullWidth
                    error={
                      props.errors.city && props.touched.city ? true : false
                    }
                    helperText={
                      props.errors.city && props.touched.city
                        ? props.errors.city
                        : ""
                    }
                    className={classes.textField}
                    label={t("admin.cinemas.city")}
                    name="city"
                    margin="dense"
                    required
                    variant="outlined"
                    value={props.values.city}
                    onChange={props.handleChange}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    error={
                      props.errors.ticketPrice && props.touched.ticketPrice
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.ticketPrice && props.touched.ticketPrice
                        ? props.errors.ticketPrice
                        : ""
                    }
                    className={classes.textField}
                    label={t("admin.cinemas.ticketPrice")}
                    margin="dense"
                    name="ticketPrice"
                    required
                    value={props.values.ticketPrice}
                    variant="outlined"
                    onChange={props.handleChange}
                  />

                  <TextField
                    error={
                      props.errors.seatsAvailable &&
                      props.touched.seatsAvailable
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.seatsAvailable &&
                      props.touched.seatsAvailable
                        ? props.errors.seatsAvailable
                        : ""
                    }
                    fullWidth
                    className={classes.textField}
                    label={t("admin.cinemas.seatsAvailable")}
                    name="seatsAvailable"
                    margin="dense"
                    required
                    variant="outlined"
                    value={props.values.seatsAvailable}
                    onChange={props.handleChange}
                  />
                </div>
                <div className={classes.field}>
                  <Button onClick={() => onAddSeatRow()}>
                    <Add /> {t("admin.cinemas.addRow")}
                  </Button>
                </div>
                {handleRenderSeatsField()}
                <div className={classes.field}>
                  <FileUpload
                    className={classes.textField}
                    file={props.values.image}
                    onUpload={(event) => {
                      const file = event.target.files[0];
                      props.setFieldValue("image", file);
                    }}
                  />
                </div>

                <Button
                  className={classes.buttonFooter}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onSubmit={props.handleSubmit}
                >
                  {submitButton}
                </Button>
                {selectedCinema && (
                  <Button
                    color="secondary"
                    className={classes.buttonFooter}
                    variant="contained"
                    onClick={() => dispatch(removeCinemas(selectedCinema._id))}
                  >
                    {t("admin.cinemas.delete")}
                  </Button>
                )}
              </Form>
            </Fragment>
          );
        }}
      </Formik>
    </div>
  );
}

export default withStyles(styles)(AddCinema);
